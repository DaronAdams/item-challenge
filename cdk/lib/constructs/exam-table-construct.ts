import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import { RemovalPolicy } from "aws-cdk-lib/core";
import { Construct } from "constructs";

export class ExamItemsTable extends Construct {
    public readonly table: dynamodb.Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new dynamodb.Table(this, 'ExamItemsTable', {
            tableName: 'ExamItems',
            partitionKey: { name: 'itemId', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'versionKey', type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.RETAIN,
        });  
    }
}