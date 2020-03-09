import React from "react";
import "./index.scss";
import Marking, { MarkSetter } from "./Marking";

interface PencilMarksProps {
  marked: Map<number, boolean>;
  setMarked: MarkSetter;
}

const PencilMarks: React.FC<PencilMarksProps> = ({ marked, setMarked }) => {
  const markings = [];
  for (let i = 1; i < 10; i++) {
    const isMarked = marked.get(i) || false;
    markings.push(<Marking key={i} digit={i} marked={isMarked} setMarked={setMarked} />);
  }

  return (<div className="pencil-marks">
    {markings}
  </div>);
};

export default PencilMarks;
