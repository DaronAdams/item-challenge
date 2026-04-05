import { HandlerResponse } from "../types/handler";
import { ExamItem } from "../types/item";
import { UpdateItemSchema } from "../types/zod-schemas";
import { storage } from "./example";

export async function updateItemHandler(
    id: string, 
    data: unknown,
): Promise<HandlerResponse<ExamItem | { error: string; details?: unknown }>> {
    const validateInput = UpdateItemSchema.safeParse(data);

    if (!validateInput.success) {
        // If we find issues throw a 4XX
        return {
            statusCode: 400,
            body: { error: `Validation issues: ${validateInput.error.issues} occured with input ${data}.`}
        };
    }

    try {
        const updatedItem = await storage.updateItem(id, validateInput.data);
        
        if (!updatedItem) {
            return {
                statusCode: 404,
                body: {error: 'Item not found in local storage'},
            };
        }
        
        console.log(`Item updated successfully: ${id}`);
        return { statusCode: 200, body: updatedItem };
    } catch (error) {
        console.error('Error updating item:', error);
        return { statusCode: 500, body: { error: 'Internal server error' } };
    }
}