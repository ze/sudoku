import React from "react";
import { BoxData, BoxEvent } from "../App";
import Box from "../Box";
import "./index.scss";

interface BoardProps {
  selected?: Set<number>;
  setSelected: (event: BoxEvent) => void;
  getBox: (id: number) => BoxData;
}

const Board: React.FC<BoardProps> = ({ selected, setSelected, getBox }) => {
  const boxes = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const hasBM = i === 2 || i === 5;
      const hasRM = j === 2 || j === 5;

      const id = i * 9 + j;
      const isSelected = selected?.has(id) || false;

      const { marks, value } = getBox(id);
      boxes.push((<Box key={id}
        id={id}
        row={i}
        column={j}
        hasRM={hasRM}
        hasBM={hasBM}
        isSelected={isSelected}
        setSelected={setSelected}
        marks={marks}
        value={value}
      />));
    }
  }

  return (<div id="board">
    {boxes}
  </div>);
};

export default Board;
