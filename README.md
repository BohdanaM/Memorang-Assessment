# QA Automation Starter

A small, deterministic web assessment demo supplied as the target application for the QA Automation Engineer exercise. The application is intentionally self-contained: questions and feedback are local fixtures, and no external AI service or API key is used.

## Requirements

- Node.js 20 or newer
- npm
- GitHub repository access/instructions supplied with the exercise

## Run the app

```bash
npm install
npm run start
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Run browser tests

Install the browser once:

```bash
npx playwright install chromium
```

Then run:

```bash
npm test
```

The repository includes a Playwright configuration and an empty `tests/` directory for your tests. The configured web server starts automatically when the test command runs.

## Exercise

Review the application and its user-facing behavior. Choose what you believe is most important to validate, add focused automated coverage, and document your reasoning, findings, and setup in the repository. Time-box your work to about 60 minutes; broad coverage is not expected.
