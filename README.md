

# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Backlog

#### TODO
 * Schema needs rework to be well nosql resolvable
 * Create Schemas for AppSync Tables
 * Resolver courses to users
 * Schema tasks
 * Schema usertasksstate (consider better nosql structure?)
 * Schema messages (compare with scalable messanger architecture bellow to get best practises)
 * Add cognito user pool
 * Add teachers as users with email and password
 * Add studends as users without any personal relatenal data (email, phone, ...)
 * Add possibility that teachers can create passwort reset links for studends.

## Communication
 * [Voice Communication](https://meet.jit.si/wirvsvirus-digitalesklassenzimmer-app-backend)
 * [Project Documentation in Google Docs](https://docs.google.com/document/d/1cS5UZ5ues6n0PYTreJy-nTTquqK57JAtLiK7wSbKXhg/edit#heading=h.6gc4k4g8xrgg)

## Setup CDK

* Setup [AWS-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
* `npm install -g aws-cdk`
* `brew install awsume` - https://awsu.me/

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


## Sample for Adding data into GraphiQL

```
mutation {
  createUser(input: {userName: "J234oh4234n", displayName: "Do3242342e"}) {
    id
    userName
    displayName
  }
}
```


## Useful Links & Tutorials
 * [Chat scalable](https://aws.amazon.com/blogs/mobile/building-a-serverless-real-time-chat-application-with-aws-appsync/ )
 * [Resolver Mapping to Resolve Different Tables towards each other](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html )

 ## Contributors
  * Great Thanks to @c0un7-z3r0