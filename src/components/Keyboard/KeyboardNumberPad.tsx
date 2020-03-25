import React from "react";
import { ValueEvent } from "../App";
import { classNames } from "../utils";

interface NumberContainerProps {
  isRegular: boolean;
  index: number;
}

interface KeyboardNumberPadProps {
  isRegular: boolean;
  setSelectedValue: (event: ValueEvent) => void;
}

const NumberContainer: React.FC<NumberContainerProps> = ({ isRegular, index }) => {
  const row = Math.floor(index / 3);
  const col = index % 3;

  const className = classNames(isRegular ? "regular" : "candidate", {
    [`row-${row}`]: row !== 0,
    [`col-${col}`]: col !== 0
  });

  return (<div className="kb-np-number">
    <p className={className}>{index + 1}</p>
  </div>);
};

const KeyboardNumberPad: React.FC<KeyboardNumberPadProps> = ({ isRegular, setSelectedValue }) => {

  const numbers = [];
  for (let i = 0; i < 9; i++) {
    numbers.push((<div key={i} onClick={() => setSelectedValue({ type: "set", value: i + 1 })} className="kb-np-number-container">
      <NumberContainer isRegular={isRegular} index={i} />
    </div>));
  }

  return (<div className="kb-np">
    {numbers}
    <div onClick={() => setSelectedValue({ type: "clear" })} className="kb-np-delete">Delete</div>
  </div>);
};

export default KeyboardNumberPad;
