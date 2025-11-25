import { Page, Locator } from '@playwright/test';

export class ItemPage {
  readonly page: Page;
  readonly calendarCells: Locator;

  constructor(page: Page) {
    this.page = page;
    this.calendarCells = page.locator('[title]');
  }

  async getBookedCells() {
    return this.page.locator('text=Booked');
  }
}
