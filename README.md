# Playwright + TypeScript E2E Test Framework

![Playwright Tests](https://github.com/apanovich1/playwright-sdet/actions/workflows/playwright.yml/badge.svg)

End-to-end UI test automation framework for [saucedemo.com](https://www.saucedemo.com),
built with **Playwright** and **TypeScript**, using a **fixture-based Page Object Model**.
Tests run cross-browser (Chromium, Firefox, WebKit) on every push via GitHub Actions.

## What's covered

| Spec | Scenario |
|------|----------|
| `login.spec.ts` | Standard user logs in and lands on the inventory page |
| `login-negative.spec.ts` | Wrong password shows an error and the user stays on the login page |
| `cart.spec.ts` | Adding an item updates the cart badge; the item appears in the cart |
| `checkout.spec.ts` | Full purchase flow: login → add to cart → checkout → order confirmation |

## Tech stack

- [Playwright Test](https://playwright.dev) — test runner, auto-waiting, web-first assertions
- TypeScript (strict mode)
- dotenv — credentials loaded from a local `.env`, never committed
- GitHub Actions — CI on every push and pull request, HTML report uploaded as an artifact

## Project structure

```
pages/            Page objects — locators + user actions for each page
fixtures.ts       Custom Playwright fixtures that provide page objects to tests
test-data/        Test data; reads credentials from environment variables
tests/            One spec file per feature/flow
playwright.config.ts
.github/workflows/playwright.yml
```

## Design decisions

- **Page objects delivered through fixtures, not constructors.** Tests declare what they
  need (`async ({ loginPage, cartPage }) => ...`) and Playwright builds it. No
  `new LoginPage(page)` boilerplate in every test, and each test gets fresh, isolated objects.
- **`loggedIn` fixture.** Most tests need an authenticated user, so login is a fixture that
  also asserts the login succeeded. If login breaks, tests fail at setup with a clear
  reason instead of failing later on an unrelated step.
- **Resilient locators.** Role-based (`getByRole`) and test-id (`getByTestId`, mapped to the
  app's `data-test` attribute) locators instead of CSS/XPath, so tests survive styling changes.
- **Web-first assertions only.** `await expect(locator).toHaveText(...)` retries until the
  condition is met — no manual waits or sleeps.
- **Secrets out of source.** Credentials come from environment variables, validated at
  startup with a clear error message if missing. Locally they come from `.env`; in CI from
  GitHub Actions secrets.
- **Environment-driven base URL.** `baseURL` is read from `BASE_URL`, falling back to
  saucedemo.com when it's unset or empty — the same suite can target another environment
  without code changes.
- **npm scripts as the single entry point.** Local runs and CI use the same commands.
- **CI-aware config.** Retries and trace capture on CI only; `test.only` is forbidden on CI.

## Running locally

```bash
npm ci
npx playwright install
cp .env.example .env    # then fill in the saucedemo credentials
npm test
npm run report
```

| Script | What it does |
|--------|--------------|
| `npm test` | Run all tests in all browsers |
| `npm run test:chromium` | Run in Chromium only |
| `npm run test:headed` | Run with visible browser windows |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run report` | Open the last HTML report |

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SAUCE_USERNAME` | yes | saucedemo login |
| `SAUCE_PASSWORD` | yes | saucedemo password |
| `BASE_URL` | no | App under test; defaults to `https://www.saucedemo.com` |

## Roadmap

- [x] Core UI tests: login, cart, checkout
- [x] Fixture-based Page Object Model, env-based test data
- [ ] API tests and hybrid API + UI tests
- [ ] Network mocking, visual regression, shared auth state (`storageState`)
- [ ] Linting, test tagging, sharding, published reports
