import * as cdk from '@aws-cdk/core';
import { GraphQLApi } from '@aws-cdk/aws-appsync'
import { Table, BillingMode, AttributeType } from '@aws-cdk/aws-dynamodb'


export class DigitalesKlassenzimmerBackendAppsyncStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const appSync = new GraphQLApi(this, 'DigitalClassRoomApi', {
      name: 'DigitalClassRoomApi',
      schemaDefinitionFile: './schema.graphql',
    });

    const userTable = new Table(this, 'UserTable', {
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: {
            name: 'id',
            type: AttributeType.STRING,
        },
    });

    appSync.addDynamoDbDataSource(
      'UserDataSource',
      'The users data source',
      userTable
    );

  }
}
