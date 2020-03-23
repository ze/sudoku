import React from "react";
import { BoxEvent } from "../App";
import "./index.scss";
import PencilMarks from "./PencilMarks";

interface BoxProps {
  id: number;
  row: number,
  column: number;
  hasRM: boolean;
  hasBM: boolean;
  isSelected: boolean;
  setSelected: (event: BoxEvent) => void;
  marks: Set<number>;
  value?: number;
}

const Box: React.FC<BoxProps> = ({ id, hasRM, hasBM, isSelected, setSelected, value, marks }) => {
  const handleClick = (event: React.MouseEvent) => {
    if (event.shiftKey) {
      setSelected({ type: "add", box: id });
    } else {
      setSelected({ type: "set", box: id });
    }
  };

  const classNames = ["box"];
  isSelected && classNames.push("selected");
  hasRM && classNames.push("rm");
  hasBM && classNames.push("bm");

  let boxRender;
  if (value) {
    boxRender = (<p className="box-value">{value}</p>);
  } else if (marks.size !== 0) {
    boxRender = (<PencilMarks marks={marks} />);
  } else {
    boxRender = (<></>);
  }

  return (<div onClick={handleClick} className={classNames.join(" ")}>{boxRender}</div>);
};

function setEqual(prevSet: Set<number>, nextSet: Set<number>): boolean {
  if (prevSet.size !== nextSet.size) return false;

  for (const n of prevSet) {
    if (!nextSet.has(n)) {
      return false;
    }
  }

  return true;
}

function areEqual(prev: Readonly<BoxProps>, next: Readonly<BoxProps>): boolean {
  const { id, hasRM, hasBM, isSelected, marks, value } = prev;

  return id === next.id && hasRM === next.hasRM && hasBM === next.hasBM && isSelected === next.isSelected &&
    value === next.value && setEqual(marks, next.marks);
}

export default React.memo(Box, areEqual);
