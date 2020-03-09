export type ValueUpdater = (value?: number) => void;

export type MarkInvoke = (marked: Set<number>) => void;
export type MarkUpdater = (invoke: MarkInvoke) => void;

class BoardData {
  private data: BoxMetadata[][];

  constructor() {
    this.data = new Array(9);
    for (let i = 0; i < 9; i++) {
      this.data[i] = new Array(9);
    }
  }

  get(row: number, column: number): number | undefined {
    const metadata = this.data[row][column];

    return metadata.value;
  }

  bind(
    row: number,
    column: number,
    updateBox: ValueUpdater,
    updateMark: MarkUpdater
  ) {
    this.data[row][column] = new BoxMetadata(updateBox, updateMark);
  }

  setValue(row: number, column: number, digit?: number) {
    const metadata = this.data[row][column];
    metadata.updateBoxValue(digit);
  }

  setMark(row: number, column: number, value: MarkInvoke) {
    const metadata = this.data[row][column];
    metadata.updateBoxMark(value);
  }
}

class BoxMetadata {
  private updateValue: ValueUpdater;
  private updateMark: MarkUpdater;
  value?: number = undefined;

  constructor(updateValue: ValueUpdater, updateMark: MarkUpdater) {
    this.updateValue = updateValue;
    this.updateMark = updateMark;
  }

  updateBoxValue(value?: number) {
    this.value = value;
    this.updateValue(value);
  }

  updateBoxMark(value: MarkInvoke) {
    this.updateMark(value);
  }
}

const boardData = new BoardData();
export default boardData;
