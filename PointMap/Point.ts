import { WrongPointData } from "../errors";

export enum PointType {
  Start,
  End,
  Letter,
  Path,
  Turn,
  Empty,
}

export default class Point {
  type: PointType = PointType.Empty;
  visitedDate: number = -1;
  row: number;
  column: number;
  data: string;

  constructor(row: number, column: number, data?: string) {
    this.row = row;
    this.column = column;
    if (data) {
      this.setData(data);
    }
  }

  setData(data: string) {
    this.data = data;
    if (!data || data === " ") {
      this.type = PointType.Empty;
    } else if (data === "@") {
      this.type = PointType.Start;
    } else if (data === "x") {
      this.type = PointType.End;
    } else if (data === "-" || data === "|") {
      this.type = PointType.Path;
    } else if (data === "+") {
      this.type = PointType.Turn;
    } else if (data >= "A" && data <= "Z") {
      this.type = PointType.Letter;
    } else {
      throw new WrongPointData();
    }
  }

  setVisitedDate(date: number) {
    this.visitedDate = date;
  }

  isVisited() {
    return this.visitedDate >= 0;
  }

  isStart() {
    return this.isTypeOf(PointType.Start);
  }

  isEnd() {
    return this.isTypeOf(PointType.End);
  }

  isTurn() {
    return this.isTypeOf(PointType.Turn);
  }

  isEmpty() {
    return this.isTypeOf(PointType.Empty);
  }

  isLetter() {
    return this.isTypeOf(PointType.Letter);
  }

  isPath() {
    return this.isTypeOf(PointType.Path);
  }

  isTypeOf(type: PointType) {
    return this.type === type;
  }
}
