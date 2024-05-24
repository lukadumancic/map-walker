import { expect, describe, it } from "@jest/globals";
import MapLoader from "../../MapLoader";

describe("MapLoader unit tests", () => {
  describe("generateMap", () => {
    it("should generate a map", () => {
      const mapInputLines = ["@---A", "|   |", "+---B"];
      const loader = new MapLoader();
      const map = loader.generateMap(mapInputLines);

      expect(map.height).toBe(3);
      expect(map.width).toBe(5);
      const emptyPoints = map.points.flat().filter((p) => p.isEmpty());
      expect(emptyPoints.length).toBe(3);
    });
  });
});
