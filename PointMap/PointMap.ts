import {
  MissingStartError,
  MultipleStartingPathsError,
  MultipleStartsError,
} from "../errors";
import Point, { PointType } from "./Point";
import checkPointTypesForErrors from "./checkMapErrors";

export enum Direction {
  Left = "Left",
  Right = "Right",
  Up = "Up",
  Down = "Down",
}

export default class PointMap {
  points: Point[][];
  height: number;
  width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.generateEmptyPoints();
  }

  getPoint(row: number, column: number) {
    if (!this.isInBoundaries(row, column)) {
      return new Point(row, column);
    }
    return this.points[row][column];
  }

  getPointNeighbours(point: Point) {
    const { row, column } = point;
    const neighbours: Record<Direction, Point> = {
      [Direction.Up]: this.getPoint(row - 1, column),
      [Direction.Down]: this.getPoint(row + 1, column),
      [Direction.Left]: this.getPoint(row, column - 1),
      [Direction.Right]: this.getPoint(row, column + 1),
    };
    return neighbours;
  }

  setPoint(row: number, column: number, pointData: string) {
    if (!this.isInBoundaries(row, column)) {
      return;
    }
    this.points[row][column] = new Point(row, column, pointData);
  }

  isMapValid() {
    const allPointTypes = this.getAllPointTypes();
    checkPointTypesForErrors(allPointTypes);
    this.isStartingPointValid();
    return true;
  }

  getStartingPoint() {
    const points = this.getPointsByType(PointType.Start);
    if (points.length === 0) {
      throw new MissingStartError();
    } else if (points.length > 1) {
      throw new MultipleStartsError();
    }
    return points[0];
  }

  private getPointsByType(type: PointType) {
    return this.points.flat().filter((p) => p.type === type);
  }

  private getAllPointTypes() {
    return this.points.flat().map((p) => p.type);
  }
  private isStartingPointValid() {
    const point = this.getStartingPoint();
    const neighbours = this.getPointNeighbours(point);
    const points = Object.values(neighbours).filter((p) => !p.isEmpty());
    if (points.length === 1) {
      return true;
    }
    throw new MultipleStartingPathsError();
  }

  private generateEmptyPoints() {
    this.points = Array.from({ length: this.height }).map((_v, i) => {
      return Array.from({ length: this.width }).map((_v, j) => new Point(i, j));
    });
  }

  private isInBoundaries(row: number, column: number) {
    return row < this.height && row >= 0 && column < this.width && column >= 0;
  }
}
