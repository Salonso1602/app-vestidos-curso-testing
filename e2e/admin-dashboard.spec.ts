import { Item } from '@/lib/RentalManagementSystem';
import { test } from './fixtures/fixtures';
import { AdminDashboardPage, ItemFormModalPage } from './pages/AdminDashboardPage';
import { testItems } from './testData/items';

test.describe('Admin dashboard - inventory grid', () => {
  test('should display expected column headers', async ({ loggedInPage }) => {
    const adminDashboard = new AdminDashboardPage(loggedInPage);

    await adminDashboard.expectDashboardVisible();

    const expectedHeaders = ['ID', 'Name', 'Category', 'Sizes', 'Price/day'];
    await adminDashboard.expectInventoryHeaders(expectedHeaders);
  });

  test('should display add new item components', async({ loggedInPage }) => {
    const adminDashboard = new AdminDashboardPage(loggedInPage);
    
    await adminDashboard.expectNewItemBtnVisible();
    
    await adminDashboard.openAddNewItemModal()
    
    await adminDashboard.expectNewItemModalVisible();
  });
  
  for (const item of Object.values(testItems)) {
        test(`adds new item: ${item.name}`, async ({ loggedInPage }) => {
            const dashboard = new AdminDashboardPage(loggedInPage);
            await dashboard.openAddNewItemModal();
            await dashboard.expectNewItemModalVisible();

            // Fill form
            const form = new ItemFormModalPage(loggedInPage);
            await form.fillForm(item as Item);

            // Submit
            await form.submit();

            // ASSERTIONS (example)
            // Check  API/backend
            // await expect(page.getByText(item.name)).toBeVisible();
            await dashboard.expectNewItemModalNotVisible();
            await dashboard.expectItemInInventory(item as Item);
        });
    }
});