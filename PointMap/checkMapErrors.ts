import { MissingEndError, MissingStartError, MultipleStartsError } from "../errors";
import { PointType } from "./Point";

const checkPointTypesForErrors = (allPointTypes: PointType[]) => {
  if (!allPointTypes.includes(PointType.Start)) {
    throw new MissingStartError();
  } else if (!allPointTypes.includes(PointType.End)) {
    throw new MissingEndError();
  } else if (allPointTypes.filter((type) => type === PointType.Start).length > 1) {
    throw new MultipleStartsError();
  }
};

export default checkPointTypesForErrors;
