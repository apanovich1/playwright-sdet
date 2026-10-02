import { test, expect } from '../fixtures';

test('user can add an item to the cart', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addToCart('Sauce Labs Backpack');

  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('added item appears in the cart', async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await expect(cartPage.cartItems).toHaveCount(1);
  await expect(cartPage.cartItems).toContainText('Sauce Labs Backpack');
});
