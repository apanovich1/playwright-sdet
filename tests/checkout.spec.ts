/*Log in
Add an item to the cart
Go to the cart page (click the cart icon)
Click Checkout
Fill in First Name, Last Name, Zip/Postal Code
Click Continue
Click Finish
Check that the page shows "Thank you for your order!"*/
import { test, expect } from '@playwright/test';

test('standard user can complete checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click(); 
  await page.getByTestId('checkout').click();
  await page.getByTestId('firstName').fill('standard_user');
  await page.getByTestId('lastName').fill('standard_sauce');
  await page.getByTestId('postalCode').fill('01-234');
  await page.getByTestId('continue').click();
  await page.getByTestId('finish').click();
  await expect (page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});