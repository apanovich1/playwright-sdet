/*Log in
Add an item to the cart
Go to the cart page (click the cart icon)
Click Checkout
Fill in First Name, Last Name, Zip/Postal Code
Click Continue
Click Finish
Check that the page shows "Thank you for your order!"*/
import { test, expect } from '../fixtures';
import { standardUser } from '../test-data/users';


test('standard user can complete checkout', async ({ loginPage, cartPage, checkoutPage, inventoryPage}) => {
  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);

  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation('Augustus','Luigi', '01-234');
  await checkoutPage.finishCheckout();
  await expect (checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});