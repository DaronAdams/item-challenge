import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "../types/handler";

export function lambdaAdapter(fn: Handler): APIGatewayProxyHandler {
    return async (event): Promise<APIGatewayProxyResult> => {
        
        const result = await fn({
            id: event.pathParameters?.id,
            body: event.body ? JSON.parse(event.body) : undefined,
            query: event.queryStringParameters ?? {},
        });

        return {
            statusCode: result.statusCode,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result.body),
        };
    };
}