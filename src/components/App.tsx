import React from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

export interface AppState {
  selected?: Set<number>;
  setSelected: (event: BoxEvent) => void;
}

export type BoxEvent =
  | { type: "add", box: number; }
  | { type: "set", box: number; }
  | { type: "clear"; };

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

  state = {
    selected: undefined,
    setSelected: this.setSelected,
  };

  render() {
    const { selected, setSelected } = this.state;

    return (<>
      <Board selected={selected} setSelected={setSelected} />
      <Keyboard isRegular={true} />
    </>);
  }
}
