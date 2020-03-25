import React from "react";
import { BoxData, ValueEvent } from "../App";
import Clipboard from "../Clipboard";
import Keyboard from "../Keyboard";
import "./index.scss";

interface SidebarProps {
  isRegular: boolean;
  setRegular: (isRegular: boolean) => void;
  setSelectedValue: (event: ValueEvent) => void;
  getBox: (id: number) => BoxData;
}

const Sidebar: React.FC<SidebarProps> = ({ isRegular, setRegular, setSelectedValue, getBox }) => (<div id="sidebar">
  <Keyboard isRegular={isRegular} setRegular={setRegular} setSelectedValue={setSelectedValue} />
  <Clipboard getBox={getBox} />
</div>);

export default Sidebar;
