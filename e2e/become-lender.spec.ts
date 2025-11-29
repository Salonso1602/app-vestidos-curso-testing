import { expect, test } from './fixtures/fixtures';
import { incompleteLenderCases, testLenderData } from './testData/lender_data';
import { BecomeALenderPage } from './pages/BecomeALenderPage';

test.describe('Become a Lender Page tests', () => {
    test('should be accesible from homePage', async ({ homePage }) => {
        await homePage.becomeLenderButton.click()

        const becomeALenderPage = new BecomeALenderPage(homePage.page)

        await becomeALenderPage.expectLoaded();
    });

    for (const lender of testLenderData) {
        test(`should be successful submition for ${lender.fullName}`, async ({ becomeALenderPage }) => {
            await becomeALenderPage.fillFields(lender.fullName, lender.email, lender.phone, lender.items);
            await becomeALenderPage.submitButton.click();

            // success modal opens - later we can validate the http request is successful
            await expect(becomeALenderPage.successModal).toBeVisible();

            await becomeALenderPage.closeSuccessModalButton.click();

            // success modal closes
            await expect(becomeALenderPage.successModal).not.toBeVisible();
        })
    }

    for (const testCase of incompleteLenderCases) {
        test(`should NOT submit when '${testCase.missing}' is missing`, async ({ becomeALenderPage }) => {
            const { fullName, email, phone, items } = testCase.data;

            // Fill only available fields
            await becomeALenderPage.clearAllFields();

            if (fullName) await becomeALenderPage.nameInput.fill(fullName);
            if (email) await becomeALenderPage.emailInput.fill(email);
            if (phone) await becomeALenderPage.phoneInput.fill(phone);
            if (items) await becomeALenderPage.messageInput.fill(items);

            await becomeALenderPage.submitButton.click();

            // success modal must NOT appear
            await expect(becomeALenderPage.successModal).not.toBeVisible();
        });
    }

});