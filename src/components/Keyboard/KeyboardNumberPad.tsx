import React from "react";


interface KeyboardNumberPadProps {
  isRegular: boolean;
}
interface NumberContainerProps extends KeyboardNumberPadProps {
  digit: number;
}

const NumberContainer: React.FC<NumberContainerProps> = ({ isRegular, digit }) => {
  const row = Math.floor(digit / 3);
  const col = digit % 3;

  const classNames = [];
  classNames.push(isRegular ? "regular" : "candidate");
  row !== 0 && classNames.push(`row-${row}`);
  col !== 0 && classNames.push(`col-${col}`);

  return (<div className="kb-np-number">
    <p className={classNames.join(" ")}>{digit + 1}</p>
  </div>);
};

const KeyboardNumberPad: React.FC<KeyboardNumberPadProps> = ({ isRegular }) => {

  const numbers = [];

  for (let i = 0; i < 9; i++) {
    numbers.push((<div key={i} className="kb-np-container">
      <NumberContainer isRegular={isRegular} digit={i} />
    </div>));
  }

  return (<div className="kb-np">
    {numbers}
  </div>);
};

export default KeyboardNumberPad;
