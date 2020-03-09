import React from "react";
import Box from "../Box";
import "./index.scss";

interface CellProps {
  originRow: number,
  originColumn: number;
}

export default class Cell extends React.Component<CellProps> {
  render() {
    const { originRow, originColumn } = this.props;

    return (<div className="cell">
      <Box row={originRow} column={originColumn} />
      <Box row={originRow} column={originColumn + 1} />
      <Box row={originRow} column={originColumn + 2} />
      <Box row={originRow + 1} column={originColumn} />
      <Box row={originRow + 1} column={originColumn + 1} />
      <Box row={originRow + 1} column={originColumn + 2} />
      <Box row={originRow + 2} column={originColumn} />
      <Box row={originRow + 2} column={originColumn + 1} />
      <Box row={originRow + 2} column={originColumn + 2} />
    </div>);
  }
}
