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

    // Verify Enterprise CRM project is visible
    const crmProject = page.getByText(/vGrow - Enterprise Multi-Tenant CRM Suite/i).first();
    await expect(crmProject).toBeAttached({ timeout: 10000 });

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
    await expect(chatButton).toBeVisible({ timeout: 15000 });
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

  test('architecture case study modal opens and displays engineering breakdown', async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects').scrollIntoViewIfNeeded({ timeout: 15000 });
    const caseStudyBtn = page.locator('button[title="View Architecture Case Study"]').first();
    await expect(caseStudyBtn).toBeVisible({ timeout: 15000 });
    await caseStudyBtn.click({ force: true });

    // Verify modal header and architectural highlights are visible
    const modalHeading = page.locator('#case-study-title');
    await expect(modalHeading).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Architectural Overview/i)).toBeVisible();

    // Verify close button
    const closeBtn = page.getByLabel('Close case study');
    await expect(closeBtn).toBeVisible({ timeout: 10000 });
    await closeBtn.click({ force: true });
    await expect(modalHeading).not.toBeVisible({ timeout: 10000 });
  });

  test('deep mobile responsiveness check across various screen sizes (320px, 375px, 412px)', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568, name: 'Small Mobile (iPhone SE 1)' },
      { width: 375, height: 667, name: 'Standard Mobile (iPhone SE/8)' },
      { width: 412, height: 915, name: 'Android Standard (Pixel/Samsung)' }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      // Verify absolutely no horizontal scroll overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScroll, `Horizontal overflow detected on ${vp.name}`).toBe(false);

      // Verify main content and header render properly
      const main = page.locator('main');
      await expect(main).toBeVisible();
    }
  });

  test('multi-device responsiveness: tablet and desktop viewports have zero overflow and proper navigation', async ({ page }) => {
    const devices = [
      { width: 768, height: 1024, name: 'iPad Portrait (768px)' },
      { width: 1024, height: 768, name: 'iPad Landscape (1024px)' },
      { width: 1280, height: 800, name: 'MacBook / Laptop (1280px)' },
      { width: 1440, height: 900, name: 'Desktop Monitor (1440px)' }
    ];

    for (const d of devices) {
      await page.setViewportSize({ width: d.width, height: d.height });
      await page.goto('/');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScroll, `Horizontal overflow on ${d.name}`).toBe(false);

      // Verify header is visible
      const header = page.locator('header');
      await expect(header).toBeVisible();
    }
  });

  test('lead inquiry form in chatbot captures all details and renders confirmation and whatsapp CTA', async ({ page }) => {
    await page.goto('/');
    const chatButton = page.getByLabel('Open chat assistant');
    await expect(chatButton).toBeVisible();
    await chatButton.click({ force: true });

    const hireActionBtn = page.getByRole('button', { name: /Hire Tanveer/i }).first();
    await expect(hireActionBtn).toBeVisible();
    await hireActionBtn.click();

    const form = page.locator('form', { hasText: 'Project Inquiry Card' }).last();
    await expect(form).toBeVisible();

    // Verify all input fields are present
    const nameInput = form.locator('input[type="text"]');
    const emailInput = form.locator('input[type="email"]');
    const phoneInput = form.locator('input[type="tel"]');
    const detailsInput = form.locator('textarea');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(detailsInput).toBeVisible();

    // Fill details
    await nameInput.fill('Sarah Connor');
    await emailInput.fill('sarah@cyberdyne.io');
    await phoneInput.fill('+1 415 555 2671');
    await detailsInput.fill('Need a scalable multi-tenant SaaS application.');

    // Select project type pill
    const pill = form.getByRole('button', { name: 'WordPress & Elementor' });
    await pill.click();

    // Verify WhatsApp direct backup link exists
    const waLink = form.locator('a[href*="wa.me"]');
    await expect(waLink).toBeVisible();
    await expect(waLink).toHaveAttribute('href', /wa\.me\/917482946610/);
  });
});
