import { test, expect } from '@playwright/test';
import { ThemeHelper } from './support/theme.helpers';

test.describe('Theme System E2E', () => {
  let theme: ThemeHelper;

  test.beforeEach(async ({ page }) => {
    theme = new ThemeHelper(page);
    await page.goto('/');
  });

  test('should verify components match the semantic theme contract', async ({
    page,
  }) => {
    // 1. Define Locators
    const standardCard = page.locator('lib-card').first().locator('.card');
    const toggleBtn = page.locator('button', { hasText: /Current:/ });

    // --- LIGHT MODE CHECK ---
    const expectedLightSurface = await theme.getSemanticColor('--ds-surface');

    // Verify Consistency: Does Card match Theme?
    await expect(standardCard).toHaveCSS(
      'background-color',
      expectedLightSurface
    );

    // --- TOGGLE THEME ---
    await toggleBtn.click();
    await expect(toggleBtn).toContainText('Current: Dark');

    // --- DARK MODE CHECK ---
    const expectedDarkSurface = await theme.getSemanticColor('--ds-surface');

    // Verify The Theme Actually CHANGED
    expect(expectedLightSurface).not.toBe(expectedDarkSurface);

    // Verify Consistency: Does Card match NEW Theme?
    await expect(standardCard).toHaveCSS(
      'background-color',
      expectedDarkSurface
    );
  });
});
