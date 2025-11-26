import { test, expect } from '@playwright/test';
import { SearchPage } from './pages/SearchPage';
import { searchTestCases } from './testData/searches';
import { env } from 'node:process';

test.describe('RF-001: Search for Items', () => {
    let searchPage: SearchPage;

    test.describe.configure({ mode: 'parallel' });

    env.IS_TEST = 'true';
    process.env.IS_TEST = 'true';

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

    test('CP-RF001_SearchPersistence: Search filters persist correctly', async ({
        page,
    }) => {
        searchPage = new SearchPage(page);
        await searchPage.goto();

        const searchFilters = {
            category: 'dress',
            size: 'M',
            color: 'Black',
        };
        await searchPage.search(searchFilters);

        const formValues = await searchPage.getFormValues();
        expect(formValues.category).toBe('dress');
        expect(formValues.size).toBe('M');
        expect(formValues.color).toBe('Black');

        const itemCount = await searchPage.getItemCount();
        expect(itemCount).toBeGreaterThan(0);
    });

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

    test('CP-RF001_NavigationFromHome: Can navigate to search from home page', async ({
        page,
    }) => {
        searchPage = new SearchPage(page);

        await searchPage.navigateToBrowseFromHome();

        expect(page.url()).toContain('/search');

        const itemCount = await searchPage.getItemCount();
        expect(itemCount).toBeGreaterThan(0);
    });

    test.describe('Category Filters', () => {
        const categories = [
            { value: 'dress', label: 'Dresses' },
            { value: 'shoes', label: 'Shoes' },
            { value: 'bag', label: 'Bags' },
            { value: 'jacket', label: 'Jackets' },
        ];

        for (const category of categories) {
            test(`Category: ${category.label}`, async ({ page }) => {
                searchPage = new SearchPage(page);
                await searchPage.goto();

                await searchPage.search({ category: category.value });

                const itemCount = await searchPage.getItemCount();
                expect(itemCount).toBeGreaterThan(0);

                const formValues = await searchPage.getFormValues();
                expect(formValues.category).toBe(category.value);
            });
        }
    });
});
