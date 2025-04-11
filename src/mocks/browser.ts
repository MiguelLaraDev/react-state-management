import { setupWorker } from "msw/browser"; // Note the '/browser' import
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
