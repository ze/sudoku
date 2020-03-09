import React from "react";

interface KeyboardSwitcherProps {
  isRegular: boolean;
}

const KeyboardSwitcher: React.FC<KeyboardSwitcherProps> = ({ isRegular }) => {
  let regularClassName = "kb-sw-regular" + (isRegular ? " kb-sw-selected" : "");
  let candidateClassName = "kb-sw-candidate" + (!isRegular ? " kb-sw-selected" : "");

  return (<div>
    <button className={regularClassName}>Regular</button>
    <button className={candidateClassName}>Candidate</button>
  </div>);
};

export default KeyboardSwitcher;
