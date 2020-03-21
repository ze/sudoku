import React from "react";

interface MarkingProps {
  digit: number;
  marked: boolean;
}

const Marking: React.FC<MarkingProps> = ({ digit, marked }) => (
  <p className={marked ? "marked" : ""}>{digit}</p>
);

export default React.memo(Marking);
