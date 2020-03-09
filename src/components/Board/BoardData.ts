export type BoxUpdater = (value?: number) => void;

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

  bind(row: number, column: number, updateBox: BoxUpdater) {
    this.data[row][column] = new BoxMetadata(updateBox);
  }

  set(row: number, column: number, value?: number) {
    const metadata = this.data[row][column];
    metadata.update(value);
  }
}

class BoxMetadata {
  private updateBox: BoxUpdater;
  value?: number = undefined;

  constructor(updateBox: BoxUpdater) {
    this.updateBox = updateBox;
  }

  update(value?: number) {
    this.value = value;
    this.updateBox(value);
  }
}

const boardData = new BoardData();
export default boardData;
