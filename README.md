# Sauce Demo Automation Framework (Playwright + TypeScript)

A robust, enterprise-grade test automation framework for [Sauce Demo](https://www.saucedemo.com/) built with **Playwright**, **TypeScript**, **Page Object Model (POM)**, and **Data-Driven Testing** design patterns.

---

## 📁 Project Architecture

```
playwright-ai-learning/
│
├── tests/                     # Playwright test specifications
│   ├── login.spec.ts          # Data-driven authentication tests
│   ├── products.spec.ts       # Catalog, sorting, and cart badge tests
│   ├── cart.spec.ts           # Cart content, removal, and navigation tests
│   └── checkout.spec.ts       # End-to-end checkout & field validation tests
│
├── pages/                     # Page Object Model (POM) classes
│   ├── LoginPage.ts           # Login page actions & locators
│   ├── ProductsPage.ts        # Inventory catalog actions & locators
│   ├── CartPage.ts            # Cart view actions & locators
│   └── CheckoutPage.ts        # Multi-step checkout actions & locators
│
├── test-data/                 # Centralized test data & test fixtures
│   └── users.ts               # Credentials, customer info, products, errors
│
├── playwright.config.ts       # Playwright runner configuration & baseURL
├── package.json               # Dependencies and runner scripts
└── README.md                  # Documentation & execution instructions
```

---

## 🚀 Key Framework Features

* **Page Object Model (POM)**: Web pages and their components are abstracted into dedicated classes, encapsulating locators and user actions to eliminate code duplication and simplify maintenance.
* **Data-Driven Testing (DDT)**: Positive, negative, boundary, and validation test scenarios are parameterized across typed datasets defined in `test-data/users.ts`.
* **Playwright Best Practices**:
  * User-facing locators (`getByRole`, `getByPlaceholder`, `getByText`).
  * Scoped/Filtered locators (`locator('.inventory_item').filter({ hasText: ... })`) to prevent brittle indexing.
  * Web-first auto-retrying assertions (`toBeVisible()`, `toHaveText()`, `toHaveURL()`).
  * Zero hard waits (`page.waitForTimeout()` is strictly avoided).
* **Cross-Browser Coverage**: Runs concurrently on **Chromium**, **Firefox**, and **WebKit**.

---

## 🛠️ Getting Started

### Prerequisites
* **Node.js**: v18 or higher
* **npm**: v9 or higher

### Installation

```bash
npm install
npx playwright install --with-deps
```

---

## 🧪 Running Tests

### Run all tests in headless mode across all configured browsers:
```bash
npm test
```

### Run tests on Chromium only:
```bash
npm run test:chromium
```

### Run tests in headed browser mode:
```bash
npm run test:headed
```

### Open Playwright Interactive UI Mode:
```bash
npm run test:ui
```

### Run a specific test suite:
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/products.spec.ts
npx playwright test tests/cart.spec.ts
npx playwright test tests/checkout.spec.ts
```

---

## 📊 Viewing Test Reports

Playwright automatically creates an HTML report after test execution:

```bash
npm run report
```
## CI/CD Learning

This project is being used to learn GitHub Actions and CI/CD with Playwright.
