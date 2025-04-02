import { http, HttpResponse } from "msw";
import type { Instrument } from "../interfaces/types";

import db from "./database.json";
import { getFilteredInstruments } from "./helpers/instruments.helper";

export const handlers = [
  http.get("/api/instruments", () => {
    const result = getFilteredInstruments(db as Instrument[]);

    console.log(result);

    return HttpResponse.json(result, { status: 200 });
  }),
];
