import React from "react";
import boardData, { BoxUpdater } from "../Board/BoardData";
import { BoardContext } from "../BoardContext";
import PencilMarks from "../PencilMarks";
import { MarkSetter } from "../PencilMarks/Marking";
import { BoxIndex } from "./BoxSet";
import "./index.scss";

interface BoxProps {
  row: number,
  column: number;
}

interface BoxState {
  value?: number;
  marked: Map<number, boolean>;
}

export default class Box extends React.Component<BoxProps, BoxState> {
  static contextType = BoardContext;
  context!: React.ContextType<typeof BoardContext>;

  state: BoxState = {
    value: undefined,
    marked: new Map()
  };

  setValue: BoxUpdater = (value) => {
    this.setState({ value });
  };

  setMarked: MarkSetter = (digit, value) => {
    const marked = new Map(this.state.marked);
    marked.set(digit, value);
    this.setState({ marked });
  };

  anyMarked = () => this.state.marked.size !== 0;

  constructor(props: Readonly<BoxProps>) {
    super(props);
    const { row, column } = this.props;

    boardData.bind(row, column, this.setValue);
  }

  onDivClick = (event: MouseEvent) => {
    if (this.context === null) return;

    const { addSelected, setSelected } = this.context;
    const { row, column } = this.props;
    const boxIndex: BoxIndex = [row, column];

    if (event.shiftKey) {
      addSelected(boxIndex);
    } else {
      setSelected(boxIndex);
    }
  };

  divRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.divRef?.current?.addEventListener("click", this.onDivClick);
  }

  componentWillUnmount(): void {
    this.divRef?.current?.removeEventListener("click", this.onDivClick);
  }

  renderValue = () => {
    return <p className="box-value">{this.state.value}</p>;
  };

  renderPencilMarks = () => {
    return <PencilMarks marked={this.state.marked} setMarked={this.setMarked} />;
  };

  render() {
    if (this.context === null) return null;
    const { selectedBoxes } = this.context;

    const { row, column } = this.props;
    const { value } = this.state;

    const boxIndex: BoxIndex = [row, column];

    const classNames = ["box"];
    const isSelected = selectedBoxes?.has(boxIndex) || false;
    isSelected && classNames.push("selected");

    const boxRender = !value && (isSelected || this.anyMarked()) ? this.renderPencilMarks : this.renderValue;

    return (<div ref={this.divRef} className={classNames.join(" ")}>{boxRender()}</div>);
  }
}
