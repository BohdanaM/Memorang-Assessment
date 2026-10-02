import { test, expect } from 'playwright/test';
import { AssessmentPage } from '../pages/AssessmentPage';

const CORRECT_ANSWER = 'Mitochondrion';
const INCORRECT_ANSWER = 'Ribosome';

test.describe('Memorang Assessment Journey - POM Architecture & Bug Reproducers', () => {
  let assessmentPage: AssessmentPage;

  test.beforeEach(async ({ page }) => {
    assessmentPage = new AssessmentPage(page);
    await assessmentPage.goto();
  });

  // 1. Correct answer flow
  test('1. Selecting correct answer ', async () => {
    // Select known correct answer by text
    await assessmentPage.selectOptionByText(CORRECT_ANSWER);
    await assessmentPage.clickCheckAnswer();
    await expect(assessmentPage.feedbackCorrectMessage).toBeVisible();

    // Verify Continue button is enabled and proceed
    await expect(assessmentPage.continueButton).toBeEnabled();
    await assessmentPage.clickContinue();
  });

  // 2. Incorrect answer feedback flow
  test('2. Selecting incorrect answer shows feedback and prevents continuation', async () => {
    // Select known incorrect answer
    await assessmentPage.selectOptionByText(INCORRECT_ANSWER);
    await assessmentPage.clickCheckAnswer();

    // Verify error feedback message appears
    await expect(assessmentPage.feedbackIncorrectMessage).toBeVisible();

    // Confirm Continue button is not enabled/visible
    await expect(assessmentPage.continueButton).not.toBeVisible();
  });

  // 3. Prevent proceeding without picking an option
  test('3. Cannot proceed without selecting any answer', async () => {
    await expect(assessmentPage.checkAnswerButton).toBeVisible();
    await assessmentPage.checkAnswerButton.click();
    // Verify feedback message appears for no selection
    await expect(assessmentPage.feedbackNoChoiceMessage).toBeVisible();
    await expect(assessmentPage.continueButton).not.toBeVisible();
  });

  // 4. [BUG REPRODUCER] Option re-selection post-validation
  test('4. [BUG] Changing option after correct answer still allows passing with incorrect state', async () => {
    // Step 1: Select correct answer and validate
    await assessmentPage.selectOptionByText(CORRECT_ANSWER);
    await assessmentPage.clickCheckAnswer();
    await expect(assessmentPage.continueButton).toBeVisible();

    // Step 2: BUG - Re-select another option prior to clicking Continue
    await assessmentPage.selectOptionByText(INCORRECT_ANSWER);
    await assessmentPage.clickContinue();
    // Step 3: Assertion - System should show incorrect feedback and stay on the same question
    // BUG ACTUAL: The app ignores the changed choice, skips validation, and moves to Question 2.
    // EXPECTED: Error message should appear, and user should not proceed.
    await expect(assessmentPage.feedbackIncorrectMessage).toBeVisible();
  });

  // 5. [BUG REPRODUCER] Session progress loss on reload
test('5. [BUG] Page reload resets session progress back to Question 1', async () => {
  // Complete Question 1
  await assessmentPage.selectOptionByText(CORRECT_ANSWER);
  await assessmentPage.clickCheckAnswer();
  await assessmentPage.clickContinue();

  // Confirm we successfully reached Question 2
  await expect(assessmentPage.questionProgress).toContainText('Question 2');

  // Reload page mid-assessment
  await assessmentPage.reloadPage();

  // ASSERTION / EXPECTED: Should remain on Question 2
  // ACTUAL BUG: App resets back to Question 1
  await expect(assessmentPage.questionProgress).toContainText('Question 2');
});
});