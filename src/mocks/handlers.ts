import { http, HttpResponse } from "msw";
import type { Instrument, InstrumentFilterOptions } from "../interfaces/instruments.types";

import type { FilterOption } from "../interfaces/filters.types";
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

  http.get("/api/categories", () => {
    const categories = db.map((instrument) => instrument.category);
    const uniqueCategories = Array.from(new Set(categories));

    return HttpResponse.json(uniqueCategories, { status: 200 });
  }),

  http.get("/api/filters", () => {
    const filters: FilterOption[] = [
      {
        id: "categories",
        title: "Categories",
        items: [
          {
            label: "Guitars",
            count: 99,
          },
          {
            label: "Drums",
            count: 99,
          },
          {
            label: "Keyboards",
            count: 99,
          },
          {
            label: "Microphones",
            count: 99,
          },
        ],
      },
      {
        id: "price",
        title: "Price range",
        items: [
          {
            label: "$0 - $50",
            count: 99,
          },
          {
            label: "$50 - $100",
            count: 99,
          },
          {
            label: "$100 - $200",
            count: 99,
          },
          {
            label: "$200 - $500",
            count: 99,
          },
          {
            label: "$500+",
            count: 99,
          },
        ],
      },
      {
        id: "availability",
        title: "Availability",
        items: [
          {
            label: "In stock",
            count: 99,
          },
          {
            label: "Out of stock",
            count: 99,
          },
          {
            label: "Few-left",
            count: 99,
          },
        ],
      },
      {
        id: "score",
        title: "Rating",
        items: [
          {
            label: "1 star",
            count: 99,
          },
          {
            label: "2 stars",
            count: 99,
          },
          {
            label: "3 stars",
            count: 99,
          },
          {
            label: "4 stars",
            count: 99,
          },
          {
            label: "5 stars",
            count: 99,
          },
        ],
      },
    ];

    return HttpResponse.json(filters, { status: 200 });
  }),
];
