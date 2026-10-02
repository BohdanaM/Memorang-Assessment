import { Page, Locator } from 'playwright/test';

export class AssessmentPage {
  readonly page: Page;
  
  // Locators defined based on actual DOM structure
  readonly choices: Locator;
  readonly checkAnswerButton: Locator;
  readonly continueButton: Locator;
  readonly feedbackIncorrectMessage: Locator;
  readonly feedbackNoChoiceMessage: Locator;
  readonly feedbackCorrectMessage: Locator;
  readonly questionProgress: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Page element selectors matching index.html / app.js
    this.choices = page.locator('label.choice');
    this.checkAnswerButton = page.locator('button:has-text("Check answer")');
    this.continueButton = page.locator('button:has-text("Continue")');
    this.feedbackCorrectMessage = page.locator('.feedback-correct');
    this.feedbackIncorrectMessage = page.locator('.feedback-incorrect');
    this.feedbackNoChoiceMessage = page.locator('.feedback-neutral');
    this.questionProgress = page.locator('text=/Question \\d+ of \\d+/');
  }

  // Navigate to app root
  async goto() {
    await this.page.goto('/');
  }

  // Select option by exact option text (e.g., 'Mitochondrion')
  async selectOptionByText(text: string) {
    await this.page.locator('label.choice', { hasText: text }).click();
  }

  // Click 'Check answer' button
  async clickCheckAnswer() {
    await this.checkAnswerButton.click();
  }

  // Click 'Continue' button to move to the next question
  async clickContinue() {
    await this.continueButton.click();
  }

  // Reload page to test state persistence
  async reloadPage() {
    await this.page.reload();
  }
}