import React from "react";
import Board from "./Board";
import { BoardContext } from "./BoardContext";
import BoxSet, { BoxIndex } from "./Box/BoxSet";
import Keyboard from "./Keyboard";

export default class App extends React.Component<{}, BoardContext> {
  setSelected = (box: BoxIndex) => {
    this.setState({ selectedBoxes: new BoxSet(box) });
  };

  addSelected = (box: BoxIndex) => {
    this.setState(prevState => ({ selectedBoxes: new BoxSet(box, prevState.selectedBoxes) }));
  };

  clearSelected = () => {
    this.setState({ selectedBoxes: undefined });
  };

  state: BoardContext = {
    selectedBoxes: undefined,
    setSelected: this.setSelected,
    addSelected: this.addSelected,
    clearSelected: this.clearSelected
  };

  render() {
    return (<BoardContext.Provider value={this.state}>
      <Board />
      <Keyboard />
    </BoardContext.Provider>);
  }
}
