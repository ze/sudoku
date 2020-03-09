export type BoxIndex = [number, number];

export default class BoxSet {
  private values: BoxIndex[];

  constructor(box: BoxIndex, boxSet?: BoxSet) {
    if (boxSet === undefined) {
      this.values = [box];
    } else {
      this.values = [...boxSet.values];
      if (!this.has(box)) {
        this.values.push(box);
      }
    }
  }

  has([row, column]: BoxIndex): boolean {
    for (const [valueRow, valueColumn] of this.values) {
      if (row === valueRow && column === valueColumn) {
        return true;
      }
    }

    return false;
  }

  forEach(callback: (row: number, column: number) => void) {
    for (const [valueRow, valueColumn] of this.values) {
      callback(valueRow, valueColumn);
    }
  }
}
