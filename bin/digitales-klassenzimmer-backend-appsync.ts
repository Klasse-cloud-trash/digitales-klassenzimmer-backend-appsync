#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DigitalesKlassenzimmerBackendAppsyncStack } from '../lib/digitales-klassenzimmer-backend-appsync-stack';

const app = new cdk.App();
new DigitalesKlassenzimmerBackendAppsyncStack(app, 'DigitalesKlassenzimmerBackendAppsyncStack');
