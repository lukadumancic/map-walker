import PointMap, { Direction, Point } from "./PointMap";
import { BrokenPathError, FakeTurnError, ForkInPathError } from "./errors";

export default class MapExecutor {
  map: PointMap;
  currentDirection: Direction;
  foundLetters: string[] = [];
  path: Point[] = [];

  constructor(map: PointMap) {
    this.map = map;
  }

  execute() {
    if (!this.map.isMapValid()) {
      return;
    }
    this.reset();
    const startingPoint = this.map.getStartingPoint();
    this.currentDirection = this.getNextDirection(startingPoint);
    this.traversePath(startingPoint, 0);
    return this.foundLetters;
  }

  getNextDirection(point: Point) {
    const neighbours = this.map.getPointNeighbours(point);
    let nextDirection: Direction | null = null;
    let letterDirection: Direction | null = null;
    Object.entries(neighbours).forEach(([direction, neighbourPoint]) => {
      if (!neighbourPoint.isEmpty() && !neighbourPoint.isVisited()) {
        if (nextDirection) {
          throw new ForkInPathError();
        }
        nextDirection = Direction[direction];
      } else if (neighbourPoint.isLetter()) {
        if (letterDirection === null) {
          letterDirection = Direction[direction];
        } else if (
          neighbourPoint.visitedDate < neighbours[letterDirection].visitedDate
        ) {
          letterDirection = Direction[direction];
        }
      }
    });
    return nextDirection ?? letterDirection;
  }

  traversePath(point: Point, date: number) {
    this.addPathPoint(point);
    if (point.isLetter() && !point.isVisited()) {
      this.addLetter(point.data);
    }
    point.setVisitedDate(date);
    const nextPoint = this.getNextPoint(point);
    if (nextPoint.isEnd()) {
      return;
    } else if (nextPoint.isEmpty()) {
      throw new BrokenPathError();
    }
    this.traversePath(nextPoint, date + 1);
  }

  private getNextPoint(point: Point) {
    const neighbours = this.map.getPointNeighbours(point);
    let nextPoint = neighbours[this.currentDirection];
    if (point.isLetter() && nextPoint.isEmpty()) {
      this.currentDirection = this.getNextDirection(point);
      nextPoint = neighbours[this.currentDirection];
    }
    if (nextPoint.isTurn()) {
      const nextDirection = this.getNextDirection(nextPoint);
      if (nextDirection === this.currentDirection) {
        throw new FakeTurnError();
      }
      this.currentDirection = nextDirection;
    }
    return nextPoint;
  }

  private addLetter(letter: string) {
    this.foundLetters.push(letter);
  }

  private addPathPoint(point: Point) {
    this.path.push(point);
  }

  private reset() {
    this.foundLetters = [];
    this.path = [];
  }
}
