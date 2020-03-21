import React, { useEffect, useRef } from "react";
import { BoxEvent } from "../App";
import "./index.scss";
import PencilMarks from "./PencilMarks";

interface BoxProps {
  id: number;
  row: number,
  column: number;
  hasRM: boolean;
  hasBM: boolean;
  isSelected: boolean;
  setSelected: (event: BoxEvent) => void;
  value?: number;
  marks: Set<number>;
}

const Box: React.FC<BoxProps> = ({ id, hasRM, hasBM, isSelected, setSelected, value, marks }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDivClick = (event: MouseEvent) => {
      if (event.shiftKey) {
        setSelected({ type: "add", box: id });
      } else {
        setSelected({ type: "set", box: id });
      }
    };

    divRef?.current?.addEventListener("click", onDivClick);

    return () => {
      divRef?.current?.removeEventListener("click", onDivClick);
    };
  }, [id, setSelected, divRef]);

  const classNames = ["box"];
  isSelected && classNames.push("selected");
  hasRM && classNames.push("rm");
  hasBM && classNames.push("bm");

  let boxRender;
  if (value) {
    boxRender = (<p className="box-value">{value}</p>);
  } else if (marks.size !== 0) {
    boxRender = (<PencilMarks marks={marks} />);
  } else {
    boxRender = (<></>);
  }

  return (<div ref={divRef} className={classNames.join(" ")}>{boxRender}</div>);
};

export default Box;
