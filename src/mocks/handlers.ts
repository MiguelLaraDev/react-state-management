import { http, HttpResponse } from "msw";
import type { Instrument, InstrumentFilterOptions } from "../interfaces/instruments.types";

import db from "./database.json";
import { getFilters } from "./helpers/filters.helper";
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

  http.get("/api/categories", () => {
    const categories = db.map((instrument) => instrument.category);
    const uniqueCategories = Array.from(new Set(categories));

    return HttpResponse.json(uniqueCategories, { status: 200 });
  }),

  http.get("/api/filters", () => {
    const filters = getFilters(db as Instrument[]);

    return HttpResponse.json(filters, { status: 200 });
  }),
];
