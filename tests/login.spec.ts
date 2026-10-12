import { test, expect } from '../fixtures';
import { getStandardUser } from '../test-data/users';

test('standard user can log in', async ({ page, loginPage, inventoryPage }) => {
  const user = getStandardUser();
  await loginPage.goto();
  await loginPage.login(user.username, user.password);

  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toHaveText('Products');
});
