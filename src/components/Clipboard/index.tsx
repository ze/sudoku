import React, { useRef, useState } from "react";
import { BoxData } from "../App";
import "./index.scss";

interface ClipboardProps {
  getBox: (id: number) => BoxData;
}

const Clipboard: React.FC<ClipboardProps> = ({ getBox }) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const getCode = () => {
    const vals = new Array<number | string>(81);

    for (let i = 0; i < 81; i++) {
      const { value } = getBox(i);
      vals[i] = value ?? ".";
    }

    while (vals[vals.length - 1] === ".") {
      vals.pop();
    }

    return vals.join("");
  };

  const handleClick = () => {
    const code = getCode();
    if (code === "") return;

    const { protocol, host, pathname } = window.location;
    const base = protocol + "//" + host + pathname;

    const url = `${base}?board=${code}`;
    setText(url);
    navigator.clipboard.writeText(url).finally(() => {
      inputRef.current?.select();
    });
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => event.target.select();

  return (<div id="clipboard">
    <input ref={inputRef} id="clip-text" type="text" value={text} onFocus={handleFocus} readOnly />
    <button id="clip-button" onClick={handleClick}>Export</button>
  </div>);
};

export default React.memo(Clipboard);
