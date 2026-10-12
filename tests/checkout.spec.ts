/*Log in
Add an item to the cart
Go to the cart page (click the cart icon)
Click Checkout
Fill in First Name, Last Name, Zip/Postal Code
Click Continue
Click Finish
Check that the page shows "Thank you for your order!"*/
import { test, expect } from '../fixtures';
import { defaultCustomer, type Customer } from '../test-data/customers';


test('standard user can complete checkout', async ({ loggedIn, cartPage, checkoutPage}) => {
  await loggedIn.addToCart('Sauce Labs Backpack');
  await loggedIn.openCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation(defaultCustomer);  
  await checkoutPage.finishCheckout();
  await expect (checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});