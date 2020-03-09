import React from "react";
import "./index.scss";
import KeyboardNumberPad from "./KeyboardNumberPad";
import KeyboardSwitcher from "./KeyboardSwitcher";

export default class Keyboard extends React.Component {

  render() {
    const isRegular = true;

    return (<div className="kb">
      <KeyboardSwitcher isRegular={isRegular} />
      <KeyboardNumberPad isRegular={isRegular} />
    </div>);
  }
}
