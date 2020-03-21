import React from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

export interface AppState {
  selected?: Set<number>;
  setSelected: (event: BoxEvent) => void;
  data: Map<number, BoxData>;
}

export type BoxEvent =
  | { type: "add", box: number; }
  | { type: "set", box: number; }
  | { type: "clear"; };

export type BoxData = {
  marks: Set<number>;
  value?: number;
};

export function getOrDefault(data: Map<number, BoxData>, id: number): BoxData {
  return data.get(id) || {
    value: undefined,
    marks: new Set()
  };
}

export default class App extends React.Component<{}, AppState> {
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

  state: AppState = {
    selected: undefined,
    setSelected: this.setSelected,
    data: new Map()
  };

  handleKeyDown = (event: KeyboardEvent) => {
    const { selected, setSelected } = this.state;
    if (selected === undefined) return;

    const { code, shiftKey } = event;

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

        const data = new Map(this.state.data);
        for (const id of selected) {
          const { marks, value } = getOrDefault(data, id);

          if (shiftKey) {
            if (marks.has(digit)) {
              marks.delete(digit);
            } else {
              marks.add(digit);
            }

            data.set(id, { marks, value });
          } else {
            data.set(id, { marks, value: digit });
          }
        }

        this.setState({ data });
        break;
      }
      case "Delete":
      case "Backspace": {
        const data = new Map(this.state.data);
        for (const id of selected) {
          const { marks, value } = getOrDefault(data, id);

          if (shiftKey || !value) {
            data.set(id, { marks: new Set(), value });
          } else {
            data.set(id, { marks, value: undefined });
          }
        }

        this.setState({ data });
        break;
      }
      case "Escape": {
        setSelected({ type: "clear" });
      }
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { selected, setSelected, data } = this.state;

    return (<>
      <Board selected={selected} setSelected={setSelected} data={data} />
      <Keyboard isRegular={true} />
    </>);
  }
}
