import { App, Stack, StackProps } from "aws-cdk-lib";
import { ExamItemsTable } from "./constructs/exam-table-construct";
import { ExamItemsApi, ExamItemsApiProps } from "./constructs/exam-api-construct";

export class ExamServiceStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props)

        const { table } = new ExamItemsTable(this, 'ExamsItemDdbTable');

        const apiProps: ExamItemsApiProps = {
            examItemDdbTable: table
        };
        new ExamItemsApi(this, 'ExamServiceApi', apiProps);
    }
}