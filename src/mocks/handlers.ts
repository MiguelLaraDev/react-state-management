import { delay, http, HttpResponse } from "msw";

import type { Instrument, InstrumentFilterOptions } from "../interfaces/instruments.types";
import db from "./data/database.json";
import locale from "./data/localization.json";
import { getFilters } from "./helpers/filters.helper";
import { getFilteredInstruments, processFilters } from "./helpers/instruments.helper";

export const handlers = [
  http.get("/api/instruments", async ({ request }) => {
    const filters = processFilters(request);

    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries()); // TODO: Improve this by moving inside processFilters...

    const options: InstrumentFilterOptions = {
      ...filters,
      pagination: {
        page: Number(params.page) || 1,
        pageSize: 10,
      },
    };

    await delay(0);

    const result = getFilteredInstruments(db as Instrument[], options);
    return HttpResponse.json(result);
  }),

  http.get("/api/filters", async () => {
    const filters = getFilters(db as Instrument[]);

    await delay(0);

    return HttpResponse.json(filters);
  }),

  http.get("/api/locale", () => {
    return HttpResponse.json(locale);
  }),
];
