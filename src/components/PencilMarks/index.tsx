import React from "react";
import "./index.scss";
import Marking from "./Marking";

interface PencilMarksProps {
  marks: Set<number>;
  highlight?: number;
}

const PencilMarks: React.FC<PencilMarksProps> = ({ marks, highlight }) => {
  const markings = [];
  for (let i = 1; i < 10; i++) {
    const isMarked = marks.has(i);
    const isHighlighted = isMarked && highlight !== undefined && highlight === i;
    markings.push(<Marking key={i} digit={i} isMarked={isMarked} isHighlighted={isHighlighted} />);
  }

  return (<div className="pencil-marks">
    {markings}
  </div>);
};

export default PencilMarks;
