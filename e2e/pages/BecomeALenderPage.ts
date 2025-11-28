import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/fixtures';

export class BecomeALenderPage {
  readonly page: Page;
  readonly titleCard: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successModal: Locator;
  readonly closeSuccessModalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleCard = page.getByRole("heading", { name: /Become a.*Lender/i });
    this.nameInput = page.locator("#fullName");
    this.emailInput = page.locator("#emailLender");
    this.phoneInput = page.locator("#phone");
    this.messageInput = page.locator("#items");
    this.submitButton = page.locator('button:has-text("Submit application")');
    this.successModal = page.getByText("Thanks for applying!", { exact: false });
    this.closeSuccessModalButton = page.getByRole("button", { name: "Close" });
  }

  async fillFields(name: string, email: string, phone: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.messageInput.fill(message);
  }

  async clearAllFields() {
    await this.nameInput.fill("");
    await this.emailInput.fill("");
    await this.phoneInput.fill("");
    await this.messageInput.fill("");
  }

  async expectLoaded() {
    await expect(this.titleCard).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.messageInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

}
