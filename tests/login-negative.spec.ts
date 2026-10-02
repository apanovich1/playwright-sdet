import { test, expect } from '../fixtures';

test('user with wrong password sees an error', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong_sauce');

  await expect(page).toHaveURL('/');
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});
