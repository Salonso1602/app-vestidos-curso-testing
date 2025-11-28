import { Page, Locator } from '@playwright/test';
import { appUrls } from '../testData/urls';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly categorySelect: Locator;
  readonly sizeInput: Locator;
  readonly colorInput: Locator;
  readonly styleInput: Locator;
  readonly searchButton: Locator;
  readonly itemCards: Locator;
  readonly browseLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[placeholder="Search…"]');
    this.categorySelect = page.locator('select[name="category"]');
    this.sizeInput = page.locator('input[placeholder="Size"]');
    this.colorInput = page.locator('input[placeholder="Color"]');
    this.styleInput = page.locator('input[placeholder="Style (e.g., cocktail)"]');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.itemCards = page.locator('div.rounded-2xl.border.bg-white');
    this.browseLink = page.getByRole('link', { name: 'Browse' }).first();
  }

  async goto(): Promise<void> {
    await this.page.goto(`${appUrls.search}`);
  }

  async navigateToBrowseFromHome(): Promise<void> {
    await this.page.goto(appUrls.home);
    await this.browseLink.click();
    await this.page.waitForURL('**/search*', { waitUntil: 'networkidle' });
  }

  async search(filters: {
    q?: string;
    category?: string;
    size?: string;
    color?: string;
    style?: string;
  }): Promise<void> {
    if (filters.q !== undefined && filters.q !== '') {
      await this.searchInput.fill(filters.q);
    }

    if (filters.category !== undefined && filters.category !== '') {
      await this.categorySelect.selectOption(filters.category);
    }

    if (filters.size !== undefined && filters.size !== '') {
      await this.sizeInput.fill(filters.size);
    }

    if (filters.color !== undefined && filters.color !== '') {
      await this.colorInput.fill(filters.color);
    }

    if (filters.style !== undefined && filters.style !== '') {
      await this.styleInput.fill(filters.style);
    }

    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getItemCount(): Promise<number> {
    return await this.itemCards.count();
  }

  async getItemsText(): Promise<string[]> {
    return await this.itemCards.allTextContents();
  }

  async getFirstItemDetails(): Promise<{ name: string; price: string } | null> {
    const firstCard = this.itemCards.first();
    const count = await this.getItemCount();

    if (count === 0) {
      return null;
    }

    const nameLocator = firstCard.locator('div > span').first();
    const priceText = await firstCard.locator('span.rounded-full').first().textContent();

    const name = await nameLocator.textContent();

    return {
      name: name?.trim() || '',
      price: priceText?.trim() || '',
    };
  }

  async clickFirstItem(): Promise<void> {
    const firstCard = this.itemCards.first();
    await firstCard.click();
    await this.page.waitForURL('**/items/**', { waitUntil: 'networkidle' });
  }

  async getFormValues(): Promise<{
    q: string;
    category: string;
    size: string;
    color: string;
    style: string;
  }> {
    return {
      q: await this.searchInput.inputValue(),
      category: await this.categorySelect.inputValue(),
      size: await this.sizeInput.inputValue(),
      color: await this.colorInput.inputValue(),
      style: await this.styleInput.inputValue(),
    };
  }

  async clearAllFilters(): Promise<void> {
    await this.searchInput.clear();
    await this.categorySelect.selectOption('');
    await this.sizeInput.clear();
    await this.colorInput.clear();
    await this.styleInput.clear();
  }
}
