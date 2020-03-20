import React from "react";
import { BoardContext } from "../BoardContext";
import Cell from "../Cell";
import boardData, { MarkInvoke } from "./BoardData";
import "./index.scss";

export default class Board extends React.Component {
  static contextType = BoardContext;
  context!: React.ContextType<typeof BoardContext>;

  valueSetter = (digit?: number) => ((row: number, column: number) => boardData.setValue(row, column, digit));
  markSetter = (value: MarkInvoke) => ((row: number, column: number) => boardData.setMark(row, column, value));

  handleKeyDown = (event: KeyboardEvent) => {
    if (this.context === null) return;

    const { selectedBoxes, clearSelected } = this.context;
    if (selectedBoxes === undefined) return;

    const code = event.code;
    const shift = event.shiftKey;
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

        const setter = shift ? this.markSetter((marked) => {
          if (marked.has(digit)) {
            marked.delete(digit);
          } else {
            marked.add(digit);
          }
        }) : this.valueSetter(digit);

        selectedBoxes.forEach(setter);
        break;
      }
      case "Delete":
      case "Backspace": {
        const setter = shift ? this.markSetter((marked) => marked.clear()) : this.valueSetter(undefined);
        selectedBoxes.forEach(setter);
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
    const cells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cells.push(<Cell key={i * 3 + j} originRow={i * 3} originColumn={j * 3} />);
      }
    }

    return (<div id="board">
      {cells}
    </div>);
  }
}
