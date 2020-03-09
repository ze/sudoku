import React from "react";
import Board from "./Board";
import { BoardContext, BoardContextInterface } from "./BoardContext";
import BoxSet, { BoxIndex } from "./Box/BoxSet";

export default class App extends React.Component<{}, BoardContextInterface> {
  setSelected = (box: BoxIndex) => {
    this.setState({ selectedBoxes: new BoxSet(box) });
  };

  addSelected = (box: BoxIndex) => {
    this.setState(prevState => ({ selectedBoxes: new BoxSet(box, prevState.selectedBoxes) }));
  };

  clearSelected = () => {
    this.setState({ selectedBoxes: undefined });
  };

  state: BoardContextInterface = {
    selectedBoxes: undefined,
    setSelected: this.setSelected,
    addSelected: this.addSelected,
    clearSelected: this.clearSelected
  };

  render() {
    return (<BoardContext.Provider value={this.state}>
      <Board />
    </BoardContext.Provider>);
  }
}
