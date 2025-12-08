// apps/demo-ds-app-e2e/src/support/theme.helpers.ts

import { Page } from '@playwright/test';

export class ThemeHelper {
  constructor(private page: Page) {}

  /**
   * Resolves a semantic token (e.g., '--ds-primary') to its
   * current computed RGB value in the browser.
   */
  async getSemanticColor(variableName: string): Promise<string> {
    return this.page.evaluate((varName) => {
      // Create an invisible element to "sample" the variable
      const temp = document.createElement('div');
      temp.style.color = `var(${varName})`;
      temp.style.display = 'none';
      document.body.appendChild(temp);

      const computed = getComputedStyle(temp).color;
      document.body.removeChild(temp);
      return computed;
    }, variableName);
  }
}
