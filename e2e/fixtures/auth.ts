import { test as base, expect as baseExpect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { appUrls } from '../testData/urls';
import { testUsers } from '../testData/credentials';

export const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, provide) => {
    await page.goto(appUrls.home);
    await page.getByRole('link', { name: 'Admin' }).click();

    await baseExpect(page.getByRole('heading', { name: 'Admin sign in' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Username' }).fill(testUsers.admin.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(testUsers.admin.password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('**/admin*', { waitUntil: 'networkidle' });
    await baseExpect(page.getByRole('heading', { name: 'Admin dashboard' })).toBeVisible();

    await provide(page);
  },
});

export const expect = baseExpect;