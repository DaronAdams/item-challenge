/**
 * Generic reponse interface for lambda handlers
 */
export interface HandlerResponse<T = unknown> {
    statusCode: number;
    body: T;
}

/**
 * Interface to hold common lambda event structure
 */
export interface LambdaEvent {
    id?: string;
    body?: unknown;
    query?: Record<string, string | undefined>;
}


export type Handler<T = unknown> = (
    event: LambdaEvent
) => Promise<HandlerResponse<T>>;