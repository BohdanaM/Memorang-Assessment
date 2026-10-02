# Memorang QA Automation Engineer Skills Exercise — Learning Journey Reliability

A small, deterministic web assessment demo supplied as the target application for the QA Automation Engineer exercise. This repository contains automated end-to-end test coverage for high-risk learner flows and critical edge cases.

---

# Test Strategy & Risk-Based Prioritization

Instead of attempting broad, low-value UI coverage, this test suite focuses on high-risk learner flows and critical application edge cases:

1. **Learner Progression (Happy Path):** Validates that selecting a correct answer enables progression to the next question.
2. **Feedback & Boundary Locking:** Ensures incorrect selections show proper feedback and empty submissions prevent proceeding.
3. **State Corruption (Risk Area / Bug 1):** Tests option re-selection post-validation to ensure state mutations do not allow invalid progression.
4. **Session Persistence (Risk Area / Bug 2):** Tests application resilience during mid-assessment page reloads.

---

# Architecture & Technical Decisions

- **Framework:** TypeScript + Playwright.
- **Design Pattern:** **Page Object Model (`pages/AssessmentPage.ts`)** to encapsulate DOM locators and page actions, ensuring long-term test maintainability.
- **Bug Reproducer Assertions:** Specific tests written to assert expected system behaviors against actual application defects.

---

# Discovered Defects & Reproduction Steps

### Bug 1: Option Re-selection Post-Validation Allows Passing in Invalid State
- **Description:** Selecting a correct answer unlocks the `Continue` button. If the learner subsequently changes their selection to an incorrect option before clicking `Continue`, the system does not re-evaluate state or block progress.
- **Expected Result:** Option selections should lock after validation, or changing the answer should re-evaluate state and display an error message.

### Bug 2: Loss of Session Progress on Page Reload
- **Description:** Refreshing the browser on Question 2 causes the application to lose session state, resetting the user back to Question 1.
- **Expected Result:** Learner progress and current question state should persist across page reloads (e.g., via `localStorage` or session tokens).

---

# Requirements

- Node.js 20 or newer
- npm

---

# Setup & Execution Instructions

Run the following commands in your terminal:

```bash
# 1. Install project dependencies
npm install

# 2. Install Playwright browser binaries
npx playwright install chromium

# 3. Run automated tests (web server starts automatically)
npm test

# 4. Run tests with Playwright UI mode (optional for debugging)
npx playwright test --ui

# 5. Run local app manually without tests (optional)
npm run start


# What to Test Next (Future Expansion)

# If additional time were allocated, the next automated coverage priorities would be:

# 1.Full End-to-End Journey & Scoring Validation:
#    - Implement a complete E2E flow covering all questions through to the final summary screen.
#    - Validate that all summary page elements, dynamic text, and final score calculations are rendered accurately.

# 2.API & Network Interception Tests:
#    - Intercept key API endpoints using Playwright's `page.route()` to verify that requests return successful `200 OK` responses.
#    - Assert data consistency between backend response payloads and the values rendered on the UI.

# 3. Session Reset / "Try Again" Flow:
#    - Add a test for the completion screen to verify that clicking the "Try again" button properly resets all assessment state and navigates the learner back to Question 1.