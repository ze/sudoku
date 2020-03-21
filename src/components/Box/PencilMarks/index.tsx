import React from "react";
import "./index.scss";
import Marking from "./Marking";

interface PencilMarksProps {
  marks: Set<number>;
}

const PencilMarks: React.FC<PencilMarksProps> = ({ marks }) => {
  const markings = [];
  for (let i = 1; i < 10; i++) {
    markings.push(<Marking key={i} digit={i} marked={marks.has(i)} />);
  }

  return (<div className="pencil-marks">
    {markings}
  </div>);
};

const areEqual = (prevProps: Readonly<PencilMarksProps>, nextProps: Readonly<PencilMarksProps>) => {
  const prevMarks = prevProps.marks;
  const nextMarks = nextProps.marks;

  if (prevMarks.size !== nextMarks.size) return false;

  for (const mark of prevMarks) {
    if (!nextMarks.has(mark)) {
      return false;
    }
  }

  return true;
};

export default React.memo(PencilMarks, areEqual);
