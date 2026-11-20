import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'iPhone SE (320px)', width: 320, height: 568 },
  { name: 'iPhone 8/SE2 (375px)', width: 375, height: 667 },
  { name: 'iPhone 14 (390px)', width: 390, height: 844 },
  { name: 'Pixel 7 (412px)', width: 412, height: 915 },
  { name: 'iPad Portrait (768px)', width: 768, height: 1024 },
  { name: 'iPad Landscape (1024px)', width: 1024, height: 768 },
  { name: 'Desktop HD (1440px)', width: 1440, height: 900 }
];

test.describe('Deep End-to-End Responsiveness & Health Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.sessionStorage.setItem('loader-seen', 'true');
    });
  });

  for (const vp of VIEWPORTS) {
    test(`verify full layout integrity, zero overflow, and interactive widgets on ${vp.name}`, async ({ page }) => {
      test.setTimeout(45000);
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      // 1. Verify absolutely no horizontal scroll overflow across the document
      const hasHorizontalScroll = await page.evaluate(async () => {
        const doc = document.documentElement;
        if (doc.scrollWidth > window.innerWidth) return true;

        const totalHeight = document.body.scrollHeight;
        const step = 400;
        for (let y = 0; y <= totalHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 20));
          if (doc.scrollWidth > window.innerWidth) return true;
        }
        window.scrollTo(0, 0);
        return false;
      });
      expect(hasHorizontalScroll, `Horizontal overflow detected on ${vp.name}`).toBe(false);

      // 2. Verify all 8 core sections exist in the DOM
      const sections = ['#home', '#about', '#services', '#skills', '#projects', '#experience', '#education', '#contact'];
      for (const sec of sections) {
        await expect(page.locator(sec)).toBeAttached();
      }

      // 3. Verify Mobile Hamburger Menu functionality if viewport < 768px
      if (vp.width < 768) {
        const menuBtn = page.getByLabel('Open menu');
        await expect(menuBtn).toBeVisible();
        await menuBtn.click();
        await page.waitForTimeout(300);

        // Verify mobile navigation items exist
        await expect(page.getByRole('button', { name: /Projects/i }).first()).toBeVisible();
        await expect(page.getByRole('button', { name: /Contact/i }).first()).toBeVisible();

        // Close menu using the drawer's close button
        const closeMenuBtn = page.getByRole('button', { name: 'Close menu' }).last();
        if (await closeMenuBtn.isVisible()) {
          await closeMenuBtn.click();
          await expect(page.locator('body')).not.toHaveClass(/no-scroll/, { timeout: 5000 });
        }
      }

      // 4. Verify ChatBot and Inline Lead Form
      const chatBtn = page.getByLabel('Open chat assistant');
      await expect(chatBtn).toBeVisible({ timeout: 15000 });
      await chatBtn.click({ force: true });

      const hireBtn = page.getByRole('button', { name: /Hire Tanveer/i }).first();
      await expect(hireBtn).toBeVisible({ timeout: 10000 });
      await hireBtn.click();

      const leadForm = page.locator('form', { hasText: 'Project Inquiry Card' }).last();
      await expect(leadForm).toBeVisible({ timeout: 10000 });

      // Verify input font sizes on mobile >= 15.5px to prevent iOS auto-zoom
      if (vp.width < 640) {
        const inputFontSize = await leadForm.locator('input[type="text"]').evaluate(el => {
          return parseFloat(window.getComputedStyle(el).fontSize);
        });
        expect(inputFontSize).toBeGreaterThanOrEqual(15.5);
      }

      // Close chatbot
      const closeChatBtn = page.locator('#mta-chatbot button[aria-label="Close chat"]');
      if (await closeChatBtn.isVisible()) {
        await closeChatBtn.click();
        await page.waitForTimeout(300);
      }

      // 5. Verify Case Study Modal
      const caseStudyBtn = page.locator('button[title="View Architecture Case Study"]').first();
      await caseStudyBtn.scrollIntoViewIfNeeded();
      await expect(caseStudyBtn).toBeVisible({ timeout: 15000 });
      await caseStudyBtn.click();

      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible({ timeout: 15000 });

      // Ensure modal does not overflow the screen width
      const modalBox = await modal.boundingBox();
      if (modalBox) {
        expect(modalBox.width).toBeLessThanOrEqual(vp.width + 1);
      }

      // Close modal
      const closeCaseStudy = page.getByLabel('Close case study');
      await closeCaseStudy.click();
      await expect(modal).not.toBeVisible({ timeout: 10000 });
    });
  }

  test('verify 0 broken images across the entire website', async ({ page }) => {
    await page.goto('/');

    const brokenImages = await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const failed = [];
      for (const img of imgs) {
        img.loading = 'eager';
        try {
          if (!img.complete) {
            await new Promise((res) => {
              img.onload = () => res();
              img.onerror = () => res();
              setTimeout(res, 500);
            });
          }
          if (img.decode) {
            await img.decode().catch(() => {});
          }
        } catch (e) {
          // ignore
        }
        if (img.naturalWidth === 0) {
          failed.push(img.src);
        }
      }
      return failed;
    });

    expect(brokenImages, `Broken images found: ${brokenImages.join(', ')}`).toEqual([]);
  });
});
