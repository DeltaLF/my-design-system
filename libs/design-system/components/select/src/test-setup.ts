import '@analogjs/vitest-angular/setup-zone';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

// Mock CSSStyleSheet.insertRule to prevent errors in JSDOM, which doesn't support @layer.
// This is a common workaround for testing Angular CDK components with Vitest/JSDOM.
const originalInsertRule = CSSStyleSheet.prototype.insertRule;
CSSStyleSheet.prototype.insertRule = function (rule: string, index?: number) {
  try {
    // Attempt to insert the rule as-is.
    return originalInsertRule.call(this, rule, index);
  } catch (e) {
    // Intercept and ignore syntax errors, which are expected for certain CSS rules in JSDOM.
    if (e instanceof DOMException && e.name === 'SyntaxError') {
      // You can add a console.warn here to see what JSDOM has problems with.
      // console.warn(`JSDOM suppressed syntax error for rule: ${rule}`);
      return 0; // Return a valid rule index.
    }
    throw e;
  }
};

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
