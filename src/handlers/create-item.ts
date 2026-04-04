import { HandlerResponse } from "../types/handler";
import { CreateItemRequest, ExamItem } from "../types/item";
import { storage } from "./example";
import { CreateItemSchema } from "../types/zod-schemas";

export async function createItemHandler(data: unknown): Promise<HandlerResponse<ExamItem | { error: string}>> {
    // Validate our input
    const validateInput = CreateItemSchema.safeParse(data);

    if (!validateInput.success) {
        // If we find issues throw a 4XX
        return {
            statusCode: 400,
            body: { error: `Validation issues: ${validateInput.error.issues} occured with input ${data}.`}
        };
    }
  
    try {
        const item = await storage.createItem(validateInput.data);
        return {
            statusCode: 201,
            body: item
        };
    } catch (error) {
        console.log('Error creating item: ', error);
        return {
            statusCode: 500,
            body: { error: 'Internal server error occured.'}
        }
    }
  }
