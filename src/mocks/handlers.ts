import { http, HttpResponse } from "msw";
import type { Instrument, InstrumentFilterOptions } from "../interfaces/types";

import db from "./database.json";
import { getFilteredInstruments } from "./helpers/instruments.helper";

export const handlers = [
  http.get("/api/instruments", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");

    const options: InstrumentFilterOptions = {
      pagination: {
        page: Number(page) || 1,
        pageSize: 10,
      },
    };

    const result = getFilteredInstruments(db as Instrument[], options);

    return HttpResponse.json(result, { status: 200 });
  }),
];
