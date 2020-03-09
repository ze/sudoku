import React from "react";
import "./index.scss";
import Marking from "./Marking";

interface PencilMarksProps {
  marked: Set<number>;
}

const PencilMarks: React.FC<PencilMarksProps> = ({ marked }) => {
  const markings = [];
  for (let i = 1; i < 10; i++) {
    markings.push(<Marking key={i} digit={i} marked={marked.has(i)} />);
  }

  return (<div className="pencil-marks">
    {markings}
  </div>);
};

const areEqual = (prevProps: Readonly<PencilMarksProps>, nextProps: Readonly<PencilMarksProps>) => {
  const prevMarked = prevProps.marked;
  const nextMarked = nextProps.marked;

  if (prevMarked.size !== nextMarked.size) return false;

  for (const mark of prevMarked.values()) {
    if (!nextMarked.has(mark)) {
      return false;
    }
  }

  return true;
};

export default React.memo(PencilMarks, areEqual);
