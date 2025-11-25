import { Page, Locator } from '@playwright/test';
import { appUrls } from '../testData/urls';

export class HomePage {
    readonly page: Page;
    readonly adminLink: Locator;
    readonly faqTitle: Locator;
    readonly faqNavbarButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminLink = page.getByRole('link', { name: 'Admin' });
        this.faqTitle = page.locator("#faq")
        this.faqNavbarButton = page.getByRole('link', { name: 'faq' })
    }

    async goto() : Promise<void> {
        await this.page.goto(appUrls.home)
    }

    async navigateToAdmin() : Promise<void> {
        await this.adminLink.click();
    }

    async navigateToFaq() : Promise<void> {
        await this.faqTitle.scrollIntoViewIfNeeded();
    }
}