import React from "react";
import { BoxData, SelectEvent } from "../App";
import Box from "../Box";
import "./index.scss";

interface BoardProps {
  selected?: Set<number>;
  setSelected: (event: SelectEvent) => void;
  getBox: (id: number) => BoxData;
  isSolved: boolean;
  highlight?: number;
}

const Board: React.FC<BoardProps> = ({ selected, setSelected, getBox, isSolved, highlight }) => {
  const boxes = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const hasBM = i === 2 || i === 5;
      const hasRM = j === 2 || j === 5;

      const id = i * 9 + j;
      const isSelected = selected?.has(id) || false;

      const { marks, value, isConfirmed } = getBox(id);

      boxes.push((<Box key={id}
        id={id}
        row={i}
        column={j}
        hasRM={hasRM}
        hasBM={hasBM}
        isSelected={isSelected}
        setSelected={setSelected}
        isConfirmed={isConfirmed}
        marks={marks}
        value={value}
        highlight={highlight}
      />));
    }
  }

  return (<div id="board" className={isSolved ? "solved" : undefined}>
    {boxes}
  </div>);
};

export default Board;
