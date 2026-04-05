import { lambdaAdapter } from './utils.js';
import { updateItemHandler } from '../handlers/update-item.js';

export const handler = lambdaAdapter(({ id, body }) =>
  id
    ? updateItemHandler(id, body)
    : Promise.resolve({ statusCode: 400, body: { error: 'Missing item id' } }),
);