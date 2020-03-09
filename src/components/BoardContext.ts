import React from "react";
import BoxSet, { BoxIndex } from "./Box/BoxSet";

export interface BoardContextInterface {
  selectedBoxes?: BoxSet;
  setSelected: (box: BoxIndex) => void;
  addSelected: (box: BoxIndex) => void;
  clearSelected: () => void;
}

export const BoardContext = React.createContext<BoardContextInterface | null>(
  null
);
