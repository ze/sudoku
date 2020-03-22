import React from "react";

interface NumberContainerProps {
  isRegular: boolean;
  index: number;
}

interface KeyboardNumberPadProps {
  isRegular: boolean;
  setSelectedValue: (digit: number) => void;
  clearSelectedValue: () => void;
}

const NumberContainer: React.FC<NumberContainerProps> = ({ isRegular, index }) => {
  const row = Math.floor(index / 3);
  const col = index % 3;

  const classNames = [];
  classNames.push(isRegular ? "regular" : "candidate");
  row !== 0 && classNames.push(`row-${row}`);
  col !== 0 && classNames.push(`col-${col}`);

  return (<div className="kb-np-number">
    <p className={classNames.join(" ")}>{index + 1}</p>
  </div>);
};

const KeyboardNumberPad: React.FC<KeyboardNumberPadProps> = ({ isRegular, setSelectedValue, clearSelectedValue }) => {
  const numbers = [];
  for (let i = 0; i < 9; i++) {
    numbers.push((<div key={i} onClick={() => setSelectedValue(i + 1)} className="kb-np-number-container">
      <NumberContainer isRegular={isRegular} index={i} />
    </div>));
  }

  return (<div className="kb-np">
    {numbers}
    <div onClick={clearSelectedValue} className="kb-np-delete">Delete</div>
  </div>);
};

export default KeyboardNumberPad;
