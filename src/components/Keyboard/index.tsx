import React from "react";
import { ValueEvent } from "../App";
import "./index.scss";
import KeyboardNumberPad from "./KeyboardNumberPad";
import KeyboardSwitcher from "./KeyboardSwitcher";

interface KeyboardProps {
  isRegular: boolean;
  setRegular: (isRegular: boolean) => void;
  setSelectedValue: (event: ValueEvent) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ isRegular, setRegular, setSelectedValue }) => (<div>
  <KeyboardSwitcher isRegular={isRegular} setRegular={setRegular} />
  <KeyboardNumberPad isRegular={isRegular} setSelectedValue={setSelectedValue} />
</div>);

export default React.memo(Keyboard);
