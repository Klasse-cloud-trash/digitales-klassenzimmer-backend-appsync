import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import DigitalesKlassenzimmerBackendAppsync = require('../lib/digitales-klassenzimmer-backend-appsync-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DigitalesKlassenzimmerBackendAppsync.DigitalesKlassenzimmerBackendAppsyncStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
