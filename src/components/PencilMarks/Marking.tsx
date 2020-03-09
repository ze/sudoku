import React, { useLayoutEffect, useRef } from "react";

interface MarkingProps {
  digit: number;
  marked: boolean;
  setMarked: MarkSetter;
}

export type MarkSetter = (digit: number, value: boolean) => void;

const Marking: React.FC<MarkingProps> = ({ digit, marked, setMarked }) => {
  const digitRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const { current } = digitRef;

    const handleClick = () => setMarked(digit, !marked);
    current?.addEventListener("click", handleClick);

    return () => {
      current?.removeEventListener("click", handleClick);
    };
  });

  const className = marked ? "marked" : "unmarked";

  return <p ref={digitRef} className={className}>{digit}</p>;
};

export default Marking;
