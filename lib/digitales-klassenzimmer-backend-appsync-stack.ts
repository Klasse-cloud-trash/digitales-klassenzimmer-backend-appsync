import * as cdk from '@aws-cdk/core';
import { GraphQLApi } from '@aws-cdk/aws-appsync';
import { ResolverDynamoDBTable } from './resolver-dynamodb-table';

export interface Props extends cdk.StackProps {
  stage: 'test' | 'prod';
}

export class DigitalesKlassenzimmerBackendAppsyncStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id, props);

    const appSync = new GraphQLApi(this, `${props.stage}-DigitalClassRoomApi`, {
      name: `${props.stage}-DigitalClassRoomApi`,
      schemaDefinitionFile: './schema.graphql'
    });

    new ResolverDynamoDBTable(this, `${props.stage}-UserTable`, {
      graphQLTypeName: 'User',
      graphQlApi: appSync,
      ...props
    });
  }
}
