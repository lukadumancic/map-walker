import PointMap from "./PointMap";

export default class MapLoader {
  map: PointMap;

  generateMap(mapInputLines: string[]) {
    const height = mapInputLines.length;
    const width = mapInputLines.reduce(
      (acc, cur) => Math.max(cur.length, acc),
      0
    );
    this.map = new PointMap(height, width);
    for (let i = 0; i < height; i++) {
      this.parseMapLine(mapInputLines[i], i);
    }
    return this.map;
  }

  parseMapLine(mapLine: string, lineIndex: number) {
    for (let i = 0; i < mapLine.length; i++) {
      const pointData = mapLine[i];
      if (pointData) {
        this.map.setPoint(lineIndex, i, pointData);
      }
    }
  }
}
