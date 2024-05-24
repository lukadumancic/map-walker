export function CustomErrorFactory(name: string) {
  return class extends Error {
    constructor() {
      super(name);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  } as typeof Error;
}

export const BrokenPathError = CustomErrorFactory("Broken path");
export const FakeTurnError = CustomErrorFactory("Fake turn");
export const MissingStartError = CustomErrorFactory("Missing start");
export const MissingEndError = CustomErrorFactory("Missing end");
export const MultipleStartsError = CustomErrorFactory("Multiple starts");
export const MultipleStartingPathsError = CustomErrorFactory("Multiple starting paths");
export const ForkInPathError = CustomErrorFactory("Fork in path");
export const WrongPointData = CustomErrorFactory("Wrong point data");
