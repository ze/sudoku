import React from "react";
import Board from "./Board";
import Sidebar from "./Sidebar";

interface AppState {
  selected?: Set<number>;
  data: Map<number, BoxData>;
  isRegular: boolean;
  isSolved: boolean;
  highlight?: number;
}

export type SelectEvent =
  | { type: "add", id: number; }
  | { type: "set", id: number; }
  | { type: "clear"; };

export type ValueEvent =
  | { type: "set", value: number; }
  | { type: "clear"; };

export type BoxData = {
  marks: Set<number>;
  value?: number;
  isConfirmed: boolean;
};

export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    selected: new Set<number>().add(0),
    data: new Map(),
    isRegular: true,
    isSolved: false,
    highlight: undefined
  };

  constructor(props: Readonly<{}>) {
    super(props);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const repr = urlSearchParams.get("board");
    if (repr !== null) {
      this.loadBoardData(repr);
      this.state.highlight = this.state.data.get(0)?.value;
    }
  }

  loadBoardData = (repr: string) => {
    const { data } = this.state;

    for (let i = 0; i < Math.min(81, repr.length); i++) {
      const digit = Number.parseInt(repr.charAt(i));
      if (!isNaN(digit) && digit > 0 && digit < 10) {
        data.set(i, { marks: new Set(), value: digit, isConfirmed: true });
      }
    }
  };

  setHighlight = (highlight?: number) => this.setState({ highlight });

  setSelected = (event: SelectEvent) => {
    switch (event.type) {
      case "add": {
        const selected = new Set<number>(this.state.selected);
        selected.add(event.id);
        this.setState({ selected, highlight: undefined });
        break;
      }
      case "set": {
        const selected = new Set<number>().add(event.id);
        this.setState({ selected, highlight: this.getBox(event.id).value });
        break;
      }
      case "clear": {
        this.setState({ selected: undefined, highlight: undefined });
        break;
      }
    }
  };

  getBox = (id: number) => this.state.data.get(id) || {
    marks: new Set(),
    value: undefined,
    isConfirmed: false
  };

  setRegular = (isRegular: boolean) => this.setState({ isRegular });

  setValue = (isRegular: boolean, { marks, value, isConfirmed }: BoxData, digit: number) => {
    if (isRegular) {
      return { marks, value: digit, isConfirmed };
    } else {
      const newMarks = new Set(marks);

      if (newMarks.has(digit)) {
        newMarks.delete(digit);
      } else {
        newMarks.add(digit);
      }

      return { marks: newMarks, value, isConfirmed };
    }
  };

  clearValue = ({ marks, value, isConfirmed }: BoxData) => {
    if (value) {
      return { marks, value: undefined, isConfirmed };
    } else {
      return { marks: new Set<number>(), value, isConfirmed };
    }
  };

  setSelectedValue = (event: ValueEvent) => {
    const { selected, isRegular } = this.state;
    if (selected === undefined) return;

    let newHighlight: number | undefined;
    const data = new Map(this.state.data);
    for (const id of selected) {
      const boxData = this.getBox(id);

      if (boxData.isConfirmed) {
        continue;
      }

      switch (event.type) {
        case "set": {
          data.set(id, this.setValue(isRegular, boxData, event.value));
          if (isRegular && selected.size === 1) {
            newHighlight = event.value;
          }
          break;
        }
        case "clear": {
          data.set(id, this.clearValue(boxData));
          break;
        }
      }
    }

    this.setState({ data, highlight: newHighlight });
  };

  moveSelected = (offset: number, condition: (id: number) => boolean) => {
    const { selected } = this.state;
    if (selected === undefined) return;

    if (selected.size === 1) {
      const id = selected.values().next().value;
      if (condition(id)) {
        this.setSelected({ type: "set", id: id + offset });
      }
    }
  };

  private static isShift = false;

  handleKeyDown = (event: KeyboardEvent) => {
    const { selected, isRegular } = this.state;
    const { code, repeat, shiftKey } = event;

    if (shiftKey && !App.isShift) {
      App.isShift = true;
      this.setState({ isRegular: !isRegular });
    }

    if (selected === undefined) return;

    switch (code) {
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
      case "Digit7":
      case "Digit8":
      case "Digit9":
      case "Numpad1":
      case "Numpad2":
      case "Numpad3":
      case "Numpad4":
      case "Numpad5":
      case "Numpad6":
      case "Numpad7":
      case "Numpad8":
      case "Numpad9": {
        if (repeat) return;

        const str = code.charAt(code.length - 1);
        const digit = Number.parseInt(str);
        this.setSelectedValue({ type: "set", value: digit });
        break;
      }
      case "Delete":
      case "Backspace": {
        if (repeat) return;

        this.setSelectedValue({ type: "clear" });
        break;
      }
      case "Escape": {
        if (repeat) return;

        this.setSelected({ type: "clear" });
        break;
      }
      case "KeyW":
      case "ArrowUp": {
        this.moveSelected(-9, (id) => id >= 9);
        break;
      }
      case "KeyS":
      case "ArrowDown": {
        this.moveSelected(9, (id) => id < 72);
        break;
      }
      case "KeyA":
      case "ArrowLeft": {
        this.moveSelected(-1, (id) => id !== 0);
        break;
      }
      case "KeyD":
      case "ArrowRight": {
        this.moveSelected(1, (id) => id !== 80);
        break;
      }
    }
  };

  handleKeyUp = (event: KeyboardEvent) => {
    // keyup doesn't set shiftKey
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
      App.isShift = false;
      this.setState({ isRegular: !this.state.isRegular });
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  getBoard = () => {
    const { data } = this.state;

    const board = new Array<Array<number>>(9);

    for (let i = 0; i < 9; i++) {
      board[i] = new Array<number>(9);
      for (let j = 0; j < 9; j++) {
        const id = i * 9 + j;

        const { value } = data.get(id)!;
        if (value === undefined) {
          return undefined;
        }

        board[i][j] = value;
      }
    }

    return board;
  };

  regionComplete = (board: number[][], row: number, column: number) => {
    const region = new Set<number>();

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        region.add(board[row + i][column + j]);
      }
    }

    return region.size === 9;
  };

  isBoardComplete = () => {
    const board = this.getBoard();
    if (board === undefined) return false;

    for (let i = 0; i < 9; i++) {
      const row = new Set<number>();
      const column = new Set<number>();

      for (let j = 0; j < 9; j++) {
        row.add(board[i][j]);
        column.add(board[j][i]);
      }

      if (row.size !== 9 || column.size !== 9) {
        return false;
      }
    }

    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        if (!this.regionComplete(board, i, j)) {
          return false;
        }
      }
    }

    return true;
  };

  dataEqual = (data: Map<number, BoxData>, prevData: Map<number, BoxData>) => {
    if (data.size !== prevData.size) {
      return false;
    }

    for (const [key, entry] of data) {
      const prevEntry = prevData.get(key)!;
      if (entry.value !== prevEntry.value) {
        return false;
      }
    }

    return true;
  };

  componentDidUpdate(_prevProps: Readonly<{}>, prevState: Readonly<AppState>) {
    const data = this.state.data;
    const prevData = prevState.data;

    if (data.size !== 81 || this.dataEqual(data, prevData)) {
      return;
    }

    this.setState({ isSolved: this.isBoardComplete() });
  }

  render() {
    const { selected, isRegular, isSolved, highlight } = this.state;

    return (<>
      <Board selected={selected}
        setSelected={this.setSelected}
        getBox={this.getBox}
        isSolved={isSolved}
        highlight={highlight} />
      <Sidebar isRegular={isRegular}
        setRegular={this.setRegular}
        setSelectedValue={this.setSelectedValue}
        getBox={this.getBox} />
    </>);
  }
}
