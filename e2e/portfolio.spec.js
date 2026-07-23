import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Tanveer/i);
});

test('can open chatbot', async ({ page }) => {
  await page.goto('/');
  const chatButton = page.getByLabel('Open chat assistant');
  await expect(chatButton).toBeVisible();
  await chatButton.click();
  const chatHeader = page.getByText('Ai Assistant');
  await expect(chatHeader).toBeVisible();
});
