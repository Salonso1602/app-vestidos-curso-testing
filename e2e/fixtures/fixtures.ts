import { test as base, expect as baseExpect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { appUrls } from '../testData/urls';
import { testUsers } from '../testData/credentials';
import { ItemPage } from '../pages/ItemPage';
import { HomePage } from '../pages/HomePage';
import { BecomeALenderPage } from '../pages/BecomeALenderPage';

export type FixtureOptions = {
  itemId: string
}

export type Fixtures = {
  homePage: HomePage
  loggedInPage: Page
  itemPage: ItemPage
  becomeALenderPage: BecomeALenderPage
}

export const test = base.extend<FixtureOptions & Fixtures>({
  homePage: async ({ page }, provide) => {
    await page.goto(appUrls.home)
    await provide(new HomePage(page))
  },
  becomeALenderPage: async ({ page }, provide) => {
    await page.goto(appUrls.becomeALender)
    await provide(new BecomeALenderPage(page))
  },
  loggedInPage: async ({ page }, provide) => {
    await page.goto(appUrls.home) // start from home page
    await page.getByRole('link', { name: 'Admin' }).click();

    await baseExpect(page.getByRole('heading', { name: 'Admin sign in' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Username' }).fill(testUsers.admin.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(testUsers.admin.password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('**/admin*', { waitUntil: 'networkidle' });
    await baseExpect(page.getByRole('heading', { name: 'Admin dashboard' })).toBeVisible();

    await provide(page);
  },
  itemId: ['1', { option: true }],
  itemPage: async ({ page, itemId }, provide) => {
    await page.goto(`${appUrls.items}/${itemId}`);
    await provide(new ItemPage(page));
  }
});

export const expect = baseExpect;