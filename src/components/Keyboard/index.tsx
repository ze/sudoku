import React from "react";
import "./index.scss";
import KeyboardNumberPad from "./KeyboardNumberPad";
import KeyboardSwitcher from "./KeyboardSwitcher";

interface KeyboardProps {
  isRegular: boolean;
  setRegular: (isRegular: boolean) => void;
  setSelectedValue: (digit: number) => void;
  clearSelectedValue: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ isRegular, setRegular, setSelectedValue, clearSelectedValue }) => (<div className="kb">
  <KeyboardSwitcher isRegular={isRegular} setRegular={setRegular} />
  <KeyboardNumberPad isRegular={isRegular}
    setSelectedValue={setSelectedValue}
    clearSelectedValue={clearSelectedValue} />
</div>);

export default React.memo(Keyboard);
