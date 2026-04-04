import { HandlerResponse } from "../types/handler";
import { ExamItem } from "../types/item";
import { storage } from "./example";

export async function getItemHandler(id: string): Promise<HandlerResponse<ExamItem | { error: string}>> {
  try {
    const item = await storage.getItem(id);

    if (!item) {
      return {
        statusCode: 404,
        body: { error: 'Item not found' },
      };
    }

    return {
      statusCode: 200,
      body: item,
    };
  } catch (error) {
    console.error('Error getting item:', error);
    return {
      statusCode: 500,
      body: { error: 'Internal server error' },
    };
  }
}