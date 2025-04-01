import { setupServer } from 'msw/node'; // Note the '/node' import
import { handlers } from './handlers';

export const server = setupServer(...handlers);