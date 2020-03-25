import React from "react";
import { classNames } from "../utils";

interface MarkingProps {
  digit: number;
  isMarked: boolean;
  isHighlighted: boolean;
}

const Marking: React.FC<MarkingProps> = ({ digit, isMarked, isHighlighted }) => {
  const className = classNames({ marked: isMarked, highlighted: isHighlighted });

  return (<p className={className}>{digit}</p>);
};

export default React.memo(Marking);
