import * as cdk from '@aws-cdk/core';
import {
  GraphQLApi,
  MappingTemplate,
  PrimaryKey,
  Values
} from '@aws-cdk/aws-appsync';
import { Table, TableProps } from '@aws-cdk/aws-dynamodb';

interface ResolverDynamoDBTableProps extends TableProps {
  graphQlApi: GraphQLApi;
  fieldType: string;
  stage: 'test' | 'prod';
}

export class ResolverDynamoDBTable extends Table {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: ResolverDynamoDBTableProps
  ) {
    super(scope, id, props);

    const dataSource = props.graphQlApi.addDynamoDbDataSource(
      `${props.stage}_${props.fieldType}DataSource`,
      'The users data source',
      this
    );

    dataSource.createResolver({
      typeName: 'Query',
      fieldName: `get${props.fieldType}`,
      requestMappingTemplate: MappingTemplate.dynamoDbGetItem('id', 'id'),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
    });

    dataSource.createResolver({
      typeName: 'Mutation',
      fieldName: `create${props.fieldType}`,
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('id').auto(),
        Values.projecting('input')
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
    });
    dataSource.createResolver({
      typeName: 'Mutation',
      fieldName: `update${props.fieldType}`,
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PrimaryKey.partition('input.id').is('id'),
        Values.projecting('input')
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
    });
    dataSource.createResolver({
      typeName: 'Mutation',
      fieldName: `delete${props.fieldType}`,
      requestMappingTemplate: MappingTemplate.dynamoDbDeleteItem(
        'input.id',
        'id'
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
    });

    dataSource.createResolver({
      typeName: 'Query',
      fieldName: `list${props.fieldType}s`,
      requestMappingTemplate: MappingTemplate.fromString(`{
      "version": "2017-02-28",
      "operation": "Scan",
      "filter": #if($context.args.filter) $util.transform.toDynamoDBFilterExpression($ctx.args.filter) #else null #end,
      "limit": $util.defaultIfNull($ctx.args.limit, 20),
      "nextToken": $util.toJson($util.defaultIfNullOrEmpty($ctx.args.nextToken, null)),
      }`),
      responseMappingTemplate: MappingTemplate.fromString(
        `$util.toJson($context.result)`
      )
    });
  }
}
