import { lambdaAdapter } from "./utils";
import { createItemHandler } from "../handlers/create-item";

export const handler = lambdaAdapter(({ body }) => {
    return createItemHandler(body);
})