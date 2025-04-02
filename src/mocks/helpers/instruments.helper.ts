import type { Instrument } from "../../interfaces/types";

export const selectByField = <FieldName extends keyof Instrument>(
  instruments: Instrument[],
  field: FieldName,
  value: Instrument[FieldName]
) => {
  return instruments.filter((instrument) => instrument[field] === value);
};

// Pseudo code:
// I need to obtain a list of instruments
// Which has a category of guitars or drums
// and a price between 0 and 100, or 200 and 500
// and a score between 3 and 4
// and an availability of "available" or "few left"
