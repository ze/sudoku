import React from "react";
import { SelectEvent } from "../App";
import PencilMarks from "../PencilMarks";
import { classNames, setEqual } from "../utils";
import "./index.scss";

interface BoxProps {
  id: number;
  row: number,
  column: number;
  hasRM: boolean;
  hasBM: boolean;
  isSelected: boolean;
  setSelected: (event: SelectEvent) => void;
  isConfirmed: boolean;
  marks: Set<number>;
  value?: number;
  highlight?: number;
}

const valueHighlighted = (value?: number, highlight?: number) => highlight !== undefined && value === highlight;

const Box: React.FC<BoxProps> = ({ id, hasRM, hasBM, isSelected, setSelected, isConfirmed, value, marks, highlight }) => {
  const handleClick = (event: React.MouseEvent) => {
    if (event.shiftKey) {
      setSelected({ type: "add", id: id });
    } else {
      setSelected({ type: "set", id: id });
    }
  };

  const className = classNames("box", {
    confirmed: isConfirmed,
    selected: isSelected,
    highlighted: valueHighlighted(value, highlight),
    rm: hasRM,
    bm: hasBM
  });

  let boxRender;
  if (value) {
    boxRender = (<p className="box-value">{value}</p>);
  } else if (marks.size !== 0) {
    boxRender = (<PencilMarks marks={marks} highlight={highlight} />);
  } else {
    boxRender = (<></>);
  }

  return (<div onClick={handleClick} className={className}>{boxRender}</div>);
};

function areEqual(prev: Readonly<BoxProps>, next: Readonly<BoxProps>): boolean {
  const { id, hasRM, hasBM, isSelected, isConfirmed, marks, value, highlight } = prev;

  const markHighlighted = (marks: Set<number>, highlight?: number) => highlight !== undefined && marks.has(highlight);
  const isHighlighted = (marks: Set<number>, value?: number, highlight?: number) =>
    valueHighlighted(value, highlight) || markHighlighted(marks, highlight);

  return id === next.id &&
    hasRM === next.hasRM &&
    hasBM === next.hasBM &&
    isSelected === next.isSelected &&
    isConfirmed === next.isConfirmed &&
    setEqual(marks, next.marks) &&
    value === next.value &&
    isHighlighted(marks, value, highlight) === isHighlighted(next.marks, next.value, next.highlight);
}

export default React.memo(Box, areEqual);
