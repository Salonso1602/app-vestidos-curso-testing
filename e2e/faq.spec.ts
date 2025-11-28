import { test, expect } from './fixtures/fixtures';
import { test_faqs } from './testData/faq_questions';

test.describe('FAQ page', () => {

  test('should be present in home page', async ({ homePage }) => {
    await homePage.navigateToFaq();

    await expect(homePage.faqTitle).toBeVisible();
  });

  test('should be accessible via FAQ navbar button', async ({ homePage }) => {
    await homePage.faqNavbarButton.click();

    await expect(homePage.faqTitle).toBeVisible();
  });

  test('should contain all questions and answers', async ({ homePage }) => {
    await homePage.navigateToFaq();

    for (const faq of test_faqs) {
      // locate the question
      const question = homePage.page.locator(`h3:has-text("${faq.question}")`);
      await expect(question).toBeVisible();

      // ensure the answer is in the same FAQ card
      const card = question.locator('xpath=..');
      const answer = card.locator(`p:has-text("${faq.answer}")`);

      await expect(answer).toBeVisible();
    }
  });
});
