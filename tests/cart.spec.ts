import { test, expect } from '../fixtures';

test('user can add an item to the cart', async ({ loggedIn }) => {
  await loggedIn.addToCart('Sauce Labs Backpack');
  await expect(loggedIn.cartBadge).toHaveText('1');
});

test('added item appears in the cart', async ({ loggedIn, cartPage }) => {
  await loggedIn.addToCart('Sauce Labs Backpack');
  await loggedIn.openCart();

  await expect(cartPage.cartItems).toHaveCount(1);
  await expect(cartPage.cartItems).toContainText('Sauce Labs Backpack');
});
