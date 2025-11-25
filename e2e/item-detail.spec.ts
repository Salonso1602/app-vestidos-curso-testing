import { test, expect } from './fixtures/fixtures';
import { addDaysToToday } from './utils/utils';

for (const testedItemId of ["1", "2", "3", "4"]) {
  test.describe(`Item detail for item ${testedItemId}`, () => {

    test.use({ itemId: testedItemId })

    test(`item ${testedItemId} with no bookings shows full availability`, async ({ page, itemPage }) => {
      await page.route(`**/api/items/${testedItemId}/availability`, async route => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ rentals: [] })
        });
      });
      const booked = await itemPage.getBookedCells();
      await expect(booked).toHaveCount(0);
    });

    test(`item ${testedItemId} with bookings shows availability and booking`, async ({ page, itemPage }) => {
      await page.route(`**/api/items/${testedItemId}/availability`, async route => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({
            rentals: [
              {
                id: testedItemId,
                itemId: testedItemId,
                start: addDaysToToday(1),
                end: addDaysToToday(3),
                customer: {
                  name: "John Doe",
                  email: "john@example.com",
                  phone: "12345678"
                },
                createdAt: "2025-01-01T10:00:00Z",
                status: "active"
              }
            ]
          })
        });
      });
      const booked = await itemPage.getBookedCells();
      await expect(booked).toHaveCount(3);
    });
  });
}
