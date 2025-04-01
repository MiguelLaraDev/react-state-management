import { http, HttpResponse } from "msw";
import type { InstrumentsPage } from "../interfaces/types";

export const handlers = [
  http.get("/api/instruments", () => {
    const result: InstrumentsPage = {
      nextPage: null,
      currentPage: 0,
      totalPages: 1,
      instruments: [
        {
          id: 1,
          slug: "fender-stratocaster",
          name: "Fender Stratocaster",
          price: 899.99,
          description:
            "Iconic electric guitar with versatile tone options and comfortable playability.",
          availability: "available",
          score: 4.8,
          thumb_small: "https://example.com/thumbs/guitars/strat_small.jpg",
          thumb_medium: "https://example.com/thumbs/guitars/strat_medium.jpg",
          image: "https://example.com/images/guitars/strat_full.jpg",
        },
      ],
    };

    return HttpResponse.json(result, { status: 200 });
  }),
];
