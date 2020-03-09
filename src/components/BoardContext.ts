import React from "react";
import BoxSet, { BoxIndex } from "./Box/BoxSet";

export interface BoardContext {
  selectedBoxes?: BoxSet;
  setSelected: (box: BoxIndex) => void;
  addSelected: (box: BoxIndex) => void;
  clearSelected: () => void;
}

export const BoardContext = React.createContext<BoardContext | null>(null);
