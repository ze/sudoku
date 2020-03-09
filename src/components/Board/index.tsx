import React from "react";
import { BoardContext } from "../BoardContext";
import Cell from "../Cell";
import boardData from "./BoardData";
import "./index.scss";


export default class Board extends React.Component {
  static contextType = BoardContext;
  context!: React.ContextType<typeof BoardContext>;

  boardDataSetter = (value?: number) => ((row: number, column: number) => boardData.set(row, column, value));

  handleKeyDown = (event: KeyboardEvent) => {
    if (this.context === null) return;

    const { selectedBoxes, clearSelected } = this.context;
    if (selectedBoxes === undefined) return;

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
        const digit = code.charAt(code.length - 1);
        const value = Number.parseInt(digit);
        selectedBoxes.forEach(this.boardDataSetter(value));
        break;
      }
      case "Backspace": {
        selectedBoxes.forEach(this.boardDataSetter(undefined));
        break;
      }
      case "Escape": {
        clearSelected();
      }
    }
  };

  componentDidMount(): void {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount(): void {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (<div id="board">
      <Cell originRow={0} originColumn={0} />
      <Cell originRow={0} originColumn={3} />
      <Cell originRow={0} originColumn={6} />
      <Cell originRow={3} originColumn={0} />
      <Cell originRow={3} originColumn={3} />
      <Cell originRow={3} originColumn={6} />
      <Cell originRow={6} originColumn={0} />
      <Cell originRow={6} originColumn={3} />
      <Cell originRow={6} originColumn={6} />
    </div>);
  }
}
