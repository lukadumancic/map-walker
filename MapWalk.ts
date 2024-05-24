import InputReader from "./InputReader";
import MapExecutor from "./MapExecutor";
import MapLoader from "./MapLoader";

export default class MapWalk {
  static async execute(inputLines: string[]) {
    const mapLoader = new MapLoader();
    const map = mapLoader.generateMap(inputLines);
    const executor = new MapExecutor(map);
    const letters = executor.execute();
    return letters;
  }

  static async executeFromInput() {
    const inputLines = await InputReader.readInputLines();
    const letters = await this.execute(inputLines);
    console.log(letters);
  }
}

