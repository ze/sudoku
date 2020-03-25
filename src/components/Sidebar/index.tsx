import React from "react";
import { BoxData } from "../App";
import Clipboard from "../Clipboard";
import Keyboard from "../Keyboard";
import "./index.scss";

interface SidebarProps {
  isRegular: boolean;
  setRegular: (isRegular: boolean) => void;
  setSelectedValue: (digit: number) => void;
  clearSelectedValue: () => void;
  getBox: (id: number) => BoxData;
}

const Sidebar: React.FC<SidebarProps> = ({ isRegular, setRegular, setSelectedValue, clearSelectedValue, getBox }) => (<div id="sidebar">
  <Keyboard isRegular={isRegular}
    setRegular={setRegular}
    setSelectedValue={setSelectedValue}
    clearSelectedValue={clearSelectedValue} />
  <Clipboard getBox={getBox} />
</div>);

export default Sidebar;
