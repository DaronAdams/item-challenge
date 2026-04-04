import { getItemHandler } from "../handlers/get-item";
import { lambdaAdapter } from "./utils";

export const handler = lambdaAdapter(({ id }) => {
    return id ? getItemHandler(id) : Promise.resolve({ statusCode: 400, body: { error: 'Missing id' } });
})