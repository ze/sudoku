import React from "react";
import "./index.scss";
import KeyboardNumberPad from "./KeyboardNumberPad";
import KeyboardSwitcher from "./KeyboardSwitcher";

export interface KeyboardProps {
  isRegular: boolean;
}

export default class Keyboard extends React.PureComponent<KeyboardProps> {

  render() {
    const { isRegular } = this.props;

    return (<div className="kb">
      <KeyboardSwitcher isRegular={isRegular} />
      <KeyboardNumberPad isRegular={isRegular} />
    </div>);
  }
}
