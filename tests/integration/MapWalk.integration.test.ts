import * as path from "node:path";
import { describe, it, expect } from "@jest/globals";
import { promises as fsPromises } from "fs";

import MapWalk from "../../MapWalk";
import {
  BrokenPathError,
  FakeTurnError,
  ForkInPathError,
  MissingEndError,
  MissingStartError,
  MultipleStartingPathsError,
  MultipleStartsError,
  WrongPointData,
} from "../../errors";

const autoTestResults = [
  "ACB",
  "ABCD",
  "ACB",
  "GOONIES",
  "BLAH",
  "AB",
  MissingStartError,
  MissingEndError,
  MultipleStartsError,
  MultipleStartsError,
  MultipleStartsError,
  ForkInPathError,
  BrokenPathError,
  MultipleStartingPathsError,
  FakeTurnError,
  WrongPointData,
  "BDLAH",
  "BTDLAH",
  "BTDKLAH",
  "ABCDE",
  "ABCDE",
  ForkInPathError,
];

describe("MapWalk integration tests", () => {
  const examplesDir = path.join(__dirname, "..", "..", "examples");

  const getExampleFileLines = async (fileName: string): Promise<string[]> => {
    const filePath = path.join(examplesDir, fileName);
    const fileContent = await fsPromises.readFile(filePath, "utf-8");
    const lines = fileContent.split("\n");
    return lines;
  };

  const generateTests = async () => {
    autoTestResults.forEach((result, index) => {
      const fileName = `test${index + 1}.txt`;
      it(`should execute correctly for ${fileName}`, async () => {
        const inputLines = await getExampleFileLines(fileName);
        const executePromise = MapWalk.execute(inputLines);
        if (typeof result === "string") {
          const letters = await executePromise;
          expect(letters.join("")).toBe(result);
        } else {
          await expect(executePromise).rejects.toThrow(result);
        }
      });
    });
  };

  generateTests();
});
