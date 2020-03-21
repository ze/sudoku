import React from "react";
import { AppState } from "../App";
import Box from "../Box";
import "./index.scss";

type BoardProps = AppState;

type BoxData = {
  marks: Set<number>;
  value?: number;
};

interface BoardState {
  data: Map<number, BoxData>;
}

export default class Board extends React.Component<BoardProps, BoardState> {
  state: BoardState = {
    data: new Map()
  };

  getOrDefault(data: Map<number, BoxData>, id: number): BoxData {
    return data.get(id) || {
      value: undefined,
      marks: new Set()
    };
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const { selected, setSelected } = this.props;
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
          const { marks, value } = this.getOrDefault(data, id);

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
          const { marks, value } = this.getOrDefault(data, id);

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
    const { selected, setSelected } = this.props;

    const boxes = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const hasBM = i === 2 || i === 5;
        const hasRM = j === 2 || j === 5;

        const id = i * 9 + j;
        const isSelected = selected?.has(id) || false;

        const { marks, value } = this.getOrDefault(this.state.data, id);
        boxes.push((<Box key={id}
          id={id}
          row={i}
          column={j}
          hasRM={hasRM}
          hasBM={hasBM}
          isSelected={isSelected}
          setSelected={setSelected}
          value={value}
          marks={marks}
        />));
      }
    }

    return (<div id="board">
      {boxes}
    </div>);
  }
}
