import { test as base, expect as baseExpect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { appUrls } from '../testData/urls';
import { testUsers } from '../testData/credentials';
import { ItemPage } from '../pages/ItemPage';

export type FixtureOptions = {
  itemId: string
}

export type Fixtures = {
  homePage: Page
  loggedInPage: Page
  itemPage: ItemPage
}

export const test = base.extend<FixtureOptions & Fixtures>({
  homePage: async ({ page }, provide) => {
    await page.goto(appUrls.home)
    await provide(page)
  },
  loggedInPage: async ({ homePage }, provide) => {
    await homePage.getByRole('link', { name: 'Admin' }).click();

    await baseExpect(homePage.getByRole('heading', { name: 'Admin sign in' })).toBeVisible();
    await homePage.getByRole('textbox', { name: 'Username' }).fill(testUsers.admin.username);
    await homePage.getByRole('textbox', { name: 'Password' }).fill(testUsers.admin.password);
    await homePage.getByRole('button', { name: 'Sign in' }).click();

    await homePage.waitForURL('**/admin*', { waitUntil: 'networkidle' });
    await baseExpect(homePage.getByRole('heading', { name: 'Admin dashboard' })).toBeVisible();

    await provide(homePage);
  },
  itemId: ['1', { option: true }],
  itemPage: async ({ page, itemId }, provide) => {
    await page.goto(`${appUrls.items}/${itemId}`);
    await provide(new ItemPage(page));
  }
});

export const expect = baseExpect;