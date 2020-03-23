import React from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

interface AppState {
  selected?: Set<number>;
  data: Map<number, BoxData>;
  isRegular: boolean;
}

export type BoxEvent =
  | { type: "add", box: number; }
  | { type: "set", box: number; }
  | { type: "clear"; };

export type BoxData = {
  marks: Set<number>;
  value?: number;
};

export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    selected: new Set<number>().add(0),
    data: new Map(),
    isRegular: true,
  };

  setSelected = (event: BoxEvent) => {
    switch (event.type) {
      case "add": {
        const selected = new Set<number>(this.state.selected);
        selected.add(event.box);
        this.setState({ selected });
        break;
      }
      case "set": {
        const selected = new Set<number>().add(event.box);
        this.setState({ selected });
        break;
      }
      case "clear": {
        this.setState({ selected: undefined });
        break;
      }
    }
  };

  getBox = (id: number) => this.state.data.get(id) || {
    marks: new Set(),
    value: undefined
  };

  setRegular = (isRegular: boolean) => this.setState({ isRegular });

  setSelectedValue = (digit: number) => {
    const { selected, isRegular } = this.state;
    if (selected === undefined) return;

    const data = new Map(this.state.data);
    for (const id of selected) {
      const { marks, value } = this.getBox(id);

      if (isRegular) {
        data.set(id, { marks, value: digit });
      } else {
        const newMarks = new Set(marks);

        if (newMarks.has(digit)) {
          newMarks.delete(digit);
        } else {
          newMarks.add(digit);
        }

        data.set(id, { marks: newMarks, value });
      }
    }

    this.setState({ data });
  };

  clearSelectedValue = () => {
    const { selected } = this.state;
    if (selected === undefined) return;

    const data = new Map(this.state.data);
    for (const id of selected) {
      const { marks, value } = this.getBox(id);

      if (value) {
        data.set(id, { marks, value: undefined });
      } else {
        data.set(id, { marks: new Set(), value });
      }
    }

    this.setState({ data });
  };

  moveSelected = (offset: number, condition: (id: number) => boolean) => {
    const { selected } = this.state;
    if (selected === undefined) return;

    if (selected.size === 1) {
      const id = selected.values().next().value;
      if (condition(id)) {
        this.setSelected({ type: "set", box: id + offset });
      }
    }
  };

  private static isShift = false;

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.repeat) return;

    const { selected, isRegular } = this.state;

    if (event.shiftKey && !App.isShift) {
      App.isShift = true;
      this.setState({ isRegular: !isRegular });
    }

    if (selected === undefined) return;

    const code = event.code;
    switch (code) {
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
      case "Digit7":
      case "Digit8":
      case "Digit9": {
        const str = code.charAt(code.length - 1);
        const digit = Number.parseInt(str);
        this.setSelectedValue(digit);
        break;
      }
      case "Delete":
      case "Backspace": {
        this.clearSelectedValue();
        break;
      }
      case "Escape": {
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

  render() {
    const { selected, isRegular } = this.state;

    return (<>
      <Board selected={selected} setSelected={this.setSelected} getBox={this.getBox} />
      <Keyboard isRegular={isRegular}
        setRegular={this.setRegular}
        setSelectedValue={this.setSelectedValue}
        clearSelectedValue={this.clearSelectedValue} />
    </>);
  }
}
