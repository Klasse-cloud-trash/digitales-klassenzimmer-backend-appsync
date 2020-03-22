#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DigitalesKlassenzimmerBackendAppsyncStack, Props } from '../lib/digitales-klassenzimmer-backend-appsync-stack';

const app = new cdk.App();

const testStageProps: Props = {
    stage: 'test'
}

const prodStageProps: Props = {
    stage: 'prod'
}

new DigitalesKlassenzimmerBackendAppsyncStack(app, 'DigitalesKlassenzimmerBackendAppsyncStack-TEST', testStageProps);
new DigitalesKlassenzimmerBackendAppsyncStack(app, 'DigitalesKlassenzimmerBackendAppsyncStack-PROD', prodStageProps);
