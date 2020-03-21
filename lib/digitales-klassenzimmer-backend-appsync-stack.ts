import * as cdk from '@aws-cdk/core';
import { GraphQLApi, MappingTemplate, PrimaryKey, Values, AuthMode } from '@aws-cdk/aws-appsync'
import { Table, BillingMode, AttributeType } from '@aws-cdk/aws-dynamodb'

export interface Props extends cdk.StackProps {
  stage: 'test' | 'prod'
}

export class DigitalesKlassenzimmerBackendAppsyncStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id, props);

    const appSync = new GraphQLApi(this, `${props.stage}-DigitalClassRoomApi`, {
      name: `${props.stage}-DigitalClassRoomApi`,
      schemaDefinitionFile: './schema.graphql',
    });

    const userTable = new Table(this, `${props.stage}-UserTable`, {
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: {
            name: 'id',
            type: AttributeType.STRING,
        },
    });

    const userDataSource= appSync.addDynamoDbDataSource(
      `${props.stage}_UserDataSource`,
      'The users data source',
      userTable
    );
    userDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getUser',
      requestMappingTemplate: MappingTemplate.dynamoDbGetItem('id', 'id'),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
  });
  userDataSource.createResolver({
    typeName: 'Mutation',
    fieldName: 'createUser',
    requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('id').auto(),
        Values.projecting('input')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
  });
  userDataSource.createResolver({
    typeName: 'Mutation',
    fieldName: 'updateUser',
    requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('input.id').is('id'),
        Values.projecting('input')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
  });
  userDataSource.createResolver({
    typeName: 'Mutation',
    fieldName: 'deleteUser',
    requestMappingTemplate: MappingTemplate.dynamoDbDeleteItem(
      'input.id',
      'id'
  ),
  responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
  });

  userDataSource.createResolver({
    typeName: 'Query',
    fieldName: 'listUsers',
    requestMappingTemplate: MappingTemplate.fromString(`{
      "version": "2017-02-28",
      "operation": "Scan",
      "filter": #if($context.args.filter) $util.transform.toDynamoDBFilterExpression($ctx.args.filter) #else null #end,
      "limit": $util.defaultIfNull($ctx.args.limit, 20),
      "nextToken": $util.toJson($util.defaultIfNullOrEmpty($ctx.args.nextToken, null)),
      }`),
    responseMappingTemplate: MappingTemplate.fromString(
        `$util.toJson($context.result)`
    ),
});

  }
}
