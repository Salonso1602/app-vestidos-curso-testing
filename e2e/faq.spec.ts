import { test, expect } from './fixtures/fixtures';
import { HomePage } from './pages/HomePage';
import { test_faqs } from './testData/faq_questions';

test.describe('FAQ page', () => {

  test('should be present in home page', async ({ homePage }) => {
    const homePageScreen = new HomePage(homePage);

    await homePageScreen.navigateToFaq();

    await expect(homePageScreen.faqTitle).toBeVisible();
  });

  test('should be accessible via FAQ navbar button', async ({ homePage }) => {
    const homePageScreen = new HomePage(homePage);

    await homePageScreen.faqNavbarButton.click();

    await expect(homePageScreen.faqTitle).toBeVisible();
  });

  test('should contain all questions and answers', async ({ homePage }) => {
    const homePageScreen = new HomePage(homePage);
    await homePageScreen.navigateToFaq();

    for (const faq of test_faqs) {
      // locate the question
      const question = homePage.locator(`h3:has-text("${faq.question}")`);
      await expect(question).toBeVisible();

      // ensure the answer is in the same FAQ card
      const card = question.locator('xpath=..');
      const answer = card.locator(`p:has-text("${faq.answer}")`);

      await expect(answer).toBeVisible();
    }
  });
});
