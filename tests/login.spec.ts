import { test, expect } from '../fixtures';
import { standardUser } from '../test-data/users';

test('standard user can log in', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);

  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toHaveText('Products');
});
