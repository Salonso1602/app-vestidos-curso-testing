import { test, expect } from '@playwright/test';
import { SearchPage } from './pages/SearchPage';
import { searchTestCases } from './testData/searches';

test.describe('RF-001: Search for Items', () => {
    let searchPage: SearchPage;

    test.describe.configure({ mode: 'parallel' });

    for (const testCase of searchTestCases) {
        test(`${testCase.id}: ${testCase.title}`, async ({ page }) => {
            searchPage = new SearchPage(page);
            await searchPage.goto();

            await searchPage.search(testCase.filters);

            if (testCase.shouldReturnResults) {
                const itemCount = await searchPage.getItemCount();
                expect(itemCount).toBeGreaterThan(0);

                console.log(
                    `✓ ${testCase.id}: Found ${itemCount} items matching criteria: ${JSON.stringify(testCase.filters)}`
                );
            } else {
                const itemCount = await searchPage.getItemCount();
                expect(itemCount).toBe(0);
            }

            const formValues = await searchPage.getFormValues();
            if (testCase.filters.q) {
                expect(formValues.q).toBe(testCase.filters.q);
            }
            if (testCase.filters.category) {
                expect(formValues.category).toBe(testCase.filters.category);
            }
            if (testCase.filters.size) {
                expect(formValues.size).toBe(testCase.filters.size);
            }
            if (testCase.filters.color) {
                expect(formValues.color).toBe(testCase.filters.color);
            }
            if (testCase.filters.style) {
                expect(formValues.style).toBe(testCase.filters.style);
            }
        });
    }

    test('CP-RF001_ClearFilters: Filters can be cleared and show all items', async ({
        page,
    }) => {
        searchPage = new SearchPage(page);
        await searchPage.goto();

        await searchPage.search({
            category: 'dress',
            size: 'M',
        });

        const filteredCount = await searchPage.getItemCount();

        await searchPage.clearAllFilters();
        await searchPage.searchButton.click();
        await page.waitForLoadState('networkidle');

        const unfilteredCount = await searchPage.getItemCount();

        expect(unfilteredCount).toBeGreaterThanOrEqual(filteredCount);
    });
});
