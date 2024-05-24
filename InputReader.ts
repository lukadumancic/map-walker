import readline from "readline";

class InputReader {
  static readInputLines(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const lines: string[] = [];

      rl.on("line", (input) => {
        lines.push(input);
      });

      rl.on("close", () => {
        resolve(lines);
      });

      rl.on("error", (error) => {
        reject(error);
      });
    });
  }
}

export default InputReader;
