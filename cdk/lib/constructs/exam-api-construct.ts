import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import path from "path";
import { HttpMethod } from "aws-cdk-lib/aws-apigatewayv2";

export interface ExamItemsApiProps {
    examItemDdbTable: dynamodb.Table;
}

export class ExamItemsApi extends Construct {
    private readonly createItemLambda: lambda.NodejsFunction;
    private readonly getItemLambda: lambda.NodejsFunction;

    constructor(scope: Construct, id: string, props: ExamItemsApiProps) {
        super(scope, id);

        const lambdaProps = {
            runtime: Runtime.NODEJS_22_X,
            environment: {
                DYNAMO_DB_TABLE_NAME: props.examItemDdbTable.tableName,
            },
            bundling: {
                forceDockerBundling: false,
            },
        };

        this.createItemLambda = new lambda.NodejsFunction(this, 'CreateItem', {
            entry: path.join(__dirname, '../../../src/lambdas/create-item.ts'),
            ...lambdaProps
        });

        this.getItemLambda = new lambda.NodejsFunction(this, 'GetItem', {
            entry: path.join(__dirname, '../../../src/lambdas/get-item.ts'),
            ...lambdaProps,
        });

        // Give access permissions to the lambdas
        this.grantTablePermissions(props.examItemDdbTable);

        const api = new apigw.RestApi(this, 'ExamItemsApi', {
            restApiName: 'Exam Items Service',
            defaultCorsPreflightOptions: {
                allowOrigins: apigw.Cors.ALL_ORIGINS,
                allowMethods: apigw.Cors.ALL_METHODS,
            },
        });
        
        const items = api.root.addResource('items');
        items.addMethod(HttpMethod.POST, new apigw.LambdaIntegration(this.createItemLambda));
        items.addMethod(HttpMethod.GET, new apigw.LambdaIntegration(this.getItemLambda));
    }

    private grantTablePermissions(table: dynamodb.Table) {
        table.grantReadWriteData(this.createItemLambda);
        table.grantReadData(this.getItemLambda);
    }
}