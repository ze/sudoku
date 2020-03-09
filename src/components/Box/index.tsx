import React from "react";
import boardData, { MarkUpdater, ValueUpdater } from "../Board/BoardData";
import { BoardContext } from "../BoardContext";
import PencilMarks from "../PencilMarks";
import { BoxIndex } from "./BoxSet";
import "./index.scss";

interface BoxProps {
  row: number,
  column: number;
}

interface BoxState {
  value?: number;
  marked: Set<number>;
}

export default class Box extends React.Component<BoxProps, BoxState> {
  static contextType = BoardContext;
  context!: React.ContextType<typeof BoardContext>;

  state: BoxState = {
    value: undefined,
    marked: new Set()
  };

  setValue: ValueUpdater = (value) => {
    this.setState({ value });
  };

  setMarked: MarkUpdater = (invoke) => {
    const marked = new Set(this.state.marked);
    invoke(marked);
    this.setState({ marked });
  };

  constructor(props: Readonly<BoxProps>) {
    super(props);
    const { row, column } = this.props;

    boardData.bind(row, column, this.setValue, this.setMarked);
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

  renderValue = () => (<p className="box-value">{this.state.value}</p>);

  renderPencilMarks = () => (<PencilMarks marked={this.state.marked} />);

  render() {
    if (this.context === null) return null;
    const { selectedBoxes } = this.context;

    const { row, column } = this.props;
    const { value, marked } = this.state;

    const boxIndex: BoxIndex = [row, column];

    const classNames = ["box"];
    const isSelected = selectedBoxes?.has(boxIndex) || false;
    isSelected && classNames.push("selected");

    let boxRender;
    if (value) {
      boxRender = this.renderValue();
    } else if (marked.size !== 0) {
      boxRender = this.renderPencilMarks();
    } else {
      boxRender = (<></>);
    }

    return (<div ref={this.divRef} className={classNames.join(" ")}>{boxRender}</div>);
  }
}
