import { expect, describe, it } from "@jest/globals";
import { Point, PointType } from "../../PointMap";
import { WrongPointData } from "../../errors";

describe("Point unit tests", () => {
  describe("constructor", () => {
    it("should initialize with data", () => {
      const row = 1;
      const column = 2;
      const data = "A";
      const point = new Point(row, column, data);

      expect(point.row).toBe(row);
      expect(point.column).toBe(column);
      expect(point.data).toBe(data);
      expect(point.visitedDate).toBe(-1);
    });

    it("should initialize without data", () => {
      const row = 1;
      const column = 2;
      const point = new Point(row, column);

      expect(point.row).toBe(row);
      expect(point.column).toBe(column);
      expect(point.data).toBeFalsy();
      expect(point.type).toBe(PointType.Empty);
      expect(point.visitedDate).toBe(-1);
    });
  });

  describe("setData", () => {
    it("should set data", () => {
      const point = new Point(1, 2);
      point.setData("T");
      expect(point.data).toBe("T");
    });

    it("should set start type from data", () => {
      const point = new Point(1, 2);
      point.setData("@");
      expect(point.isStart()).toBe(true);
    });

    it("should set end type from data", () => {
      const point = new Point(1, 2);
      point.setData("x");
      expect(point.isEnd()).toBe(true);
    });

    it("should set letter type from data", () => {
      const point = new Point(1, 2);
      point.setData("L");
      expect(point.isLetter()).toBe(true);
    });

    it("should set turn type from data", () => {
      const point = new Point(1, 2);
      point.setData("+");
      expect(point.isTurn()).toBe(true);
    });

    it("should set path type from data horizontal", () => {
      const point = new Point(1, 2);
      point.setData("-");
      expect(point.isPath()).toBe(true);
    });

    it("should set path type from data vertical", () => {
      const point = new Point(1, 2);
      point.setData("|");
      expect(point.isPath()).toBe(true);
    });

    it("should throw WrongPointData error", () => {
      const point = new Point(1, 2);
      expect(() => point.setData("t")).toThrow(WrongPointData);
    });
  });

  describe("visited", () => {
    it("should not be visited", () => {
      const point = new Point(1, 2);
      expect(point.isVisited()).toBe(false);
    });

    it("should be visited", () => {
      const point = new Point(1, 2);
      point.setVisitedDate(0);
      expect(point.isVisited()).toBe(true);
    });
  });
});
