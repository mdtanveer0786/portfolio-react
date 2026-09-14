import { test, expect } from '@playwright/test';

test.describe('Portfolio End-to-End Test Suite', () => {
  test('homepage loads with proper title and meta', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Tanveer/i);
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText('Full Stack');
  });

  test('WordPress and Elementor skills & experience are visible', async ({ page }) => {
    await page.goto('/');

    // Verify WordPress and Elementor are present in the DOM
    const wordpressBadge = page.locator('text=WordPress').first();
    await expect(wordpressBadge).toBeAttached();

    const elementorBadge = page.locator('text=Elementor').first();
    await expect(elementorBadge).toBeAttached();

    // Verify Experience title reflects WordPress Developer
    const expTitle = page.getByText(/WordPress Developer/i).first();
    await expect(expTitle).toBeAttached();

    // Ensure Odoo is completely absent
    const odooMention = page.getByText(/Odoo/i);
    await expect(odooMention).toHaveCount(0);
  });

  test('navigation smooth scroll works', async ({ page }) => {
    await page.goto('/');
    const projectsNav = page.locator('button', { hasText: 'Projects' }).first();
    if (await projectsNav.isVisible()) {
      await projectsNav.click();
      await expect(page.locator('#projects')).toBeInViewport({ timeout: 5000 });
    }
  });

  test('can open chatbot and ask about skills', async ({ page }) => {
    await page.goto('/');
    const chatButton = page.getByLabel('Open chat assistant');
    await expect(chatButton).toBeVisible();
    await chatButton.click();

    const chatHeader = page.getByText('Ai Assistant');
    await expect(chatHeader).toBeVisible();

    const input = page.getByLabel('Chat message input');
    await expect(input).toBeVisible();
    await input.fill('What are your skills?');
    await page.keyboard.press('Enter');

    // Wait for the bot response which now includes WordPress & Elementor
    await expect(page.getByText(/WordPress/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('theme toggle works properly', async ({ page }) => {
    await page.goto('/');
    const themeButton = page.getByLabel(/Switch to/i);
    await expect(themeButton).toBeVisible();
    await themeButton.click();
    const htmlTag = page.locator('html');
    await expect(htmlTag).toHaveClass(/(dark|light)/);
  });
});
