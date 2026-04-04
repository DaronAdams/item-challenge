/**
 * Example Handler
 *
 * This demonstrates how to create a handler for the API.
 * You can use this as a template for implementing the required endpoints.
 */

import { createStorage } from '../storage/index.js';

export const storage = createStorage();

export async function createItemHandler(data: any) {
  try {
    // TODO: Add validation using Zod
    const item = await storage.createItem(data);

    return {
      statusCode: 201,
      body: item,
    };
  } catch (error) {
    console.error('Error creating item:', error);
    return {
      statusCode: 500,
      body: { error: 'Internal server error' },
    };
  }
}

// TODO: Implement other handlers:
// - updateItemHandler
// - listItemsHandler
// - createVersionHandler
// - getAuditTrailHandler
