import { test, expect } from '../fixtures';

test('standard user can log in', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});
