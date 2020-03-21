import React from "react";
import { KeyboardProps } from ".";

const KeyboardSwitcher: React.FC<KeyboardProps> = ({ isRegular }) => {
  let regularClassName = "kb-sw-regular" + (isRegular ? " kb-sw-selected" : "");
  let candidateClassName = "kb-sw-candidate" + (!isRegular ? " kb-sw-selected" : "");

  return (<div>
    <button className={regularClassName}>Regular</button>
    <button className={candidateClassName}>Candidate</button>
  </div>);
};

export default KeyboardSwitcher;
