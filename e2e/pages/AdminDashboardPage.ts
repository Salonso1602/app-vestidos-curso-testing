import { Item } from '@/lib/RentalManagementSystem';
import { Page, Locator, expect } from '@playwright/test';

export class AdminDashboardPage {
    readonly page: Page;
    readonly dashboardHeading: Locator;
    readonly signOutButton: Locator;
    readonly inventoryHeaderSection: Locator;
    readonly openNewItemModalBtn: Locator;
    readonly newItemModal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardHeading = page.getByRole('heading', { name: 'Admin dashboard' });
        this.signOutButton = page.getByRole('button', { name: 'Sign out' });
        this.inventoryHeaderSection = page.locator('#table-header');

        this.openNewItemModalBtn = page.locator("#open-new-item-modal-btn");
        this.newItemModal = page.locator("#new-item-modal");
    }

    async expectNewItemBtnVisible() {
        await expect(this.openNewItemModalBtn).toBeVisible();
    }

    async expectNewItemModalVisible() {
        await expect(this.newItemModal).toBeVisible();
    }

    async expectNewItemModalNotVisible() {
        await expect(this.newItemModal).toBeHidden();
    }

    async expectDashboardVisible() {
        await expect(this.dashboardHeading).toBeVisible();
        await expect(this.signOutButton).toBeVisible();
    }

    async expectInventoryHeaders(headers: string[]) {
        await expect(this.inventoryHeaderSection).toBeVisible();
        for (const header of headers) {
            await expect(
                this.inventoryHeaderSection.getByRole('cell', { name: header, exact: true })
            ).toBeVisible();
        }
    }

    async expectItemInInventory(item: Item) {
        const row = this.page.locator(`tbody tr:has-text("${item.name}")`).first();

        await expect(row).toBeVisible({ timeout: 5000 });
        await row.scrollIntoViewIfNeeded();

        const cells = row.locator('td');

        await expect(cells.nth(0)).toHaveText(String(item.id ?? ""));
        await expect(cells.nth(1)).toHaveText(item.name);
        await expect(cells.nth(2)).toHaveText(item.category);
        await expect(cells.nth(3)).toHaveText(item.sizes.join(", "));
        await expect(cells.nth(4)).toHaveText(`$${item.pricePerDay}`);
    }

    async signOut() {
        await this.signOutButton.click();
    }

    async openAddNewItemModal() {
        await this.openNewItemModalBtn.click();
    }
}

export class ItemFormModalPage {
    readonly page: Page;

    readonly nameInput: Locator;
    readonly altInput: Locator;
    readonly categoryDropdown: Locator;
    readonly colorInput: Locator;
    readonly styleInput: Locator;
    readonly descriptionInput: Locator;
    readonly pricePerDayInput: Locator;
    readonly sizeInputs: Locator;
    readonly imageInputs: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.nameInput = page.locator('input[name="name"]');
        this.altInput = page.locator('input[name="alt"]');
        this.categoryDropdown = page.locator('select[name="category"]');
        this.colorInput = page.locator('input[name="color"]');
        this.styleInput = page.locator('input[name="style"]');
        this.descriptionInput = page.locator('input[name="description"]');
        this.pricePerDayInput = page.locator('input[name="pricePerDay"]');

        // Dynamic fields
        this.sizeInputs = page.locator('label:has-text("Sizes") + div input');
        this.imageInputs = page.locator('label:has-text("Images") + div input');

        this.submitButton = this.page.locator('button[type="submit"]', { hasText: 'Add' });
    }

    async fillForm(item: Item) {
        await this.nameInput.fill(item.name);
        await this.altInput.fill(item.alt);
        await this.categoryDropdown.selectOption(item.category);
        await this.colorInput.fill(item.color);
        await this.styleInput.fill(item.style ?? "");
        await this.descriptionInput.fill(item.description);

        await this.pricePerDayInput.fill(item.pricePerDay.toString());

        for (let i = 0; i < item.sizes.length; i++) {
            const field = this.sizeInputs.nth(i);
            await field.fill(item.sizes[i]);

            if (i === item.sizes.length - 1) await field.blur();
        }

        // Playwright needs actual files; create fake ones dynamically.
        for (let i = 0; i < item.images.length; i++) {
            const field = this.imageInputs.nth(i);

            await field.setInputFiles({
                name: `test-image-${i}.jpg`,
                mimeType: 'image/jpeg',
                buffer: Buffer.from('fake image data')
            });

            if (i === item.images.length - 1) await field.blur();
        }
    }

    async submit() {
        const scrollable = this.page.locator('#new-item-modal').locator('div:has(form)');

        await scrollable.evaluate((el) => {
            el.scrollTo({ top: el.scrollHeight, behavior: 'instant' });
        });

        await expect(this.submitButton).toBeVisible();
        await this.submitButton.click();
    }
}
