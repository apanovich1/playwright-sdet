import { test, expect } from '../fixtures';
import { standardUser } from '../test-data/users';


test('user with wrong password sees an error', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(standardUser.username, 'incorrectPassword');

  await expect(page).toHaveURL('/');
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});
