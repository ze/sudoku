import React from "react";

interface KeyboardSwitcherProps {
  isRegular: boolean;
  setRegular: (isRegular: boolean) => void;
}

const KeyboardSwitcher: React.FC<KeyboardSwitcherProps> = ({ isRegular, setRegular }) => {
  let regularClassName = "kb-sw-regular" + (isRegular ? " kb-sw-selected" : "");
  let candidateClassName = "kb-sw-candidate" + (!isRegular ? " kb-sw-selected" : "");

  return (<div>
    <button onClick={() => setRegular(true)} className={regularClassName}>Regular</button>
    <button onClick={() => setRegular(false)} className={candidateClassName}>Candidate</button>
  </div>);
};

export default KeyboardSwitcher;
