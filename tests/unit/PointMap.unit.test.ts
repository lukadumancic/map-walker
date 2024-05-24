import { expect, describe, it, beforeEach } from "@jest/globals";
import PointMap, { Direction } from "../../PointMap";
import {
  MissingEndError,
  MissingStartError,
  MultipleStartingPathsError,
  MultipleStartsError,
} from "../../errors";

describe("Map unit tests", () => {
  describe("constructor", () => {
    it("should initialize with the given height and width", () => {
      const height = 10;
      const width = 33;
      const map = new PointMap(height, width);

      expect(map.height).toBe(height);
      expect(map.width).toBe(width);
    });

    it("should initialize empty points on map", () => {
      const height = 10;
      const width = 33;
      const map = new PointMap(height, width);

      expect(map.points[0][0].isEmpty()).toBe(true);
    });
  });

  describe("setPoint", () => {
    let map: PointMap;

    beforeEach(() => {
      map = new PointMap(5, 5);
    });

    it("should set point with data on map", () => {
      map.setPoint(2, 2, "T");

      expect(map.points[2][2].isEmpty()).toBe(false);
      expect(map.points[2][2].data).toBe("T");
    });

    it("should not edit map if out of boundaries", () => {
      const oldPoints = JSON.stringify(map.points);
      map.setPoint(10, 10, "T");
      const newPoints = JSON.stringify(map.points);

      expect(newPoints).toBe(oldPoints);
    });
  });

  describe("getPoint", () => {
    let map: PointMap;

    beforeEach(() => {
      map = new PointMap(5, 5);
    });

    it("should return the correct point", () => {
      map.setPoint(2, 2, "T");
      const point = map.getPoint(2, 2);

      expect(point.data).toEqual("T");
    });

    it("should return empty point if out of boundaries", () => {
      expect(map.getPoint(-1, 0).isEmpty()).toEqual(true);
      expect(map.getPoint(5, 0).isEmpty()).toEqual(true);
      expect(map.getPoint(0, 5).isEmpty()).toEqual(true);
      expect(map.getPoint(0, -1).isEmpty()).toEqual(true);
    });
  });

  describe("getPointNeighbours", () => {
    it("should return 4 neighbours", () => {
      const map = new PointMap(5, 5);
      const point = map.getPoint(2, 2);
      const neighbours = map.getPointNeighbours(point);

      expect(neighbours[Direction.Up]).toBeTruthy();
      expect(neighbours[Direction.Down]).toBeTruthy();
      expect(neighbours[Direction.Left]).toBeTruthy();
      expect(neighbours[Direction.Right]).toBeTruthy();
    });
  });

  describe("isMapValid", () => {
    let map: PointMap;

    beforeEach(() => {
      map = new PointMap(5, 5);
    });

    it("should throw MissingStartError", () => {
      expect(() => map.isMapValid()).toThrow(MissingStartError);
    });

    it("should throw MissingEndError", () => {
      map.setPoint(2, 2, "@");
      expect(() => map.isMapValid()).toThrow(MissingEndError);
    });

    it("should throw MissingEndError", () => {
      map.setPoint(1, 1, "@");
      map.setPoint(2, 2, "@");
      map.setPoint(3, 3, "x");
      expect(() => map.isMapValid()).toThrow(MultipleStartsError);
    });

    it("should throw MissingEndError horizontal", () => {
      map.setPoint(1, 1, "-");
      map.setPoint(1, 2, "@");
      map.setPoint(1, 3, "-");
      map.setPoint(3, 3, "x");
      expect(() => map.isMapValid()).toThrow(MultipleStartingPathsError);
    });

    it("should throw MissingEndError vertical", () => {
      map.setPoint(1, 2, "|");
      map.setPoint(1, 2, "@");
      map.setPoint(3, 2, "|");
      map.setPoint(3, 3, "x");
      expect(() => map.isMapValid()).toThrow(MultipleStartingPathsError);
    });
  });

  describe("getStartingPoint", () => {
    it("should return the starting point", () => {
      const map = new PointMap(5, 5);
      map.setPoint(2, 2, "@");

      expect(map.getStartingPoint().isStart()).toEqual(true);
    });

    it("should throw MissingStartError", () => {
      const map = new PointMap(3, 3);

      expect(() => map.getStartingPoint()).toThrow(MissingStartError);
    });

    it("should throw MultipleStartsError", () => {
      const map = new PointMap(3, 3);
      map.setPoint(0, 0, "@");
      map.setPoint(0, 1, "@");

      expect(() => map.getStartingPoint()).toThrow(MultipleStartsError);
    });
  });
});
