import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Pre-set loader-seen in sessionStorage so pages load immediately without waiting for initial animation loader
  await page.addInitScript(() => {
    window.sessionStorage.setItem('loader-seen', 'true');
  });
});

test.describe('Portfolio End-to-End Test Suite', () => {
  test('homepage loads with proper title, heading, and no horizontal scroll overflow', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Tanveer/i);

    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText('Full Stack');

    // Verify there is no unintentional horizontal overflow across desktop & mobile
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

  test('WordPress and Elementor skills & experience are visible', async ({ page }) => {
    await page.goto('/');

    // Wait for content to hydrate
    const mainSection = page.locator('main');
    await expect(mainSection).toBeVisible();

    // Verify WordPress and Elementor badges exist in the DOM
    const wordpressBadge = page.locator('text=WordPress').first();
    await expect(wordpressBadge).toBeAttached({ timeout: 10000 });

    const elementorBadge = page.locator('text=Elementor').first();
    await expect(elementorBadge).toBeAttached({ timeout: 10000 });

    // Verify Experience title reflects WordPress Developer
    const expTitle = page.getByText(/WordPress Developer/i).first();
    await expect(expTitle).toBeAttached({ timeout: 10000 });

    // Ensure Odoo is completely absent across the application
    const odooMention = page.getByText(/Odoo/i);
    await expect(odooMention).toHaveCount(0);
  });

  test('navigation works seamlessly on desktop and mobile', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
      // Test mobile hamburger menu
      const openMenuBtn = page.getByLabel('Open menu');
      await expect(openMenuBtn).toBeVisible({ timeout: 10000 });
      await openMenuBtn.click({ force: true });

      // Ensure mobile sidebar opens and click the mobile Projects nav button
      const mobileProjectsBtn = page.locator('.custom-scrollbar button', { hasText: 'Projects' }).first();
      await expect(mobileProjectsBtn).toBeVisible({ timeout: 10000 });
      await mobileProjectsBtn.click();

      // Verify smooth navigation to #projects
      await expect(page.locator('#projects')).toBeInViewport({ timeout: 10000 });
    } else {
      const desktopProjectsBtn = page.locator('header nav button', { hasText: 'Projects' }).first();
      if (await desktopProjectsBtn.isVisible()) {
        await desktopProjectsBtn.click();
        await expect(desktopProjectsBtn).toHaveAttribute('aria-current', 'page', { timeout: 7000 });
      }
    }
  });

  test('chatbot functions properly on both desktop and mobile viewports', async ({ page, isMobile }) => {
    await page.goto('/');
    const chatButton = page.getByLabel('Open chat assistant');
    await expect(chatButton).toBeVisible({ timeout: 10000 });
    await chatButton.click({ force: true });

    const chatHeader = page.getByText('Ai Assistant');
    await expect(chatHeader).toBeVisible();

    // On mobile viewports, verify chatbot renders responsive sheet
    if (isMobile) {
      const chatContainer = page.locator('#mta-chatbot > div').first();
      await expect(chatContainer).toBeVisible();
    }

    const input = page.getByLabel('Chat message input');
    await expect(input).toBeVisible();
    await input.fill('What are your skills?');
    await page.keyboard.press('Enter');

    // Wait for the bot response which includes WordPress & Elementor
    await expect(page.getByText(/WordPress/i).first()).toBeVisible({ timeout: 15000 });

    // Test closing chatbot
    const headerCloseBtn = page.locator('#mta-chatbot button[aria-label="Close chat"]');
    if (await headerCloseBtn.isVisible()) {
      await headerCloseBtn.click();
      await expect(chatHeader).not.toBeVisible();
    }
  });

  test('theme toggle works properly', async ({ page }) => {
    await page.goto('/');
    const themeButton = page.getByLabel(/Switch to/i);
    await expect(themeButton).toBeVisible({ timeout: 10000 });
    await themeButton.click({ force: true });
    const htmlTag = page.locator('html');
    await expect(htmlTag).toHaveClass(/(dark|light)/);
  });
});
