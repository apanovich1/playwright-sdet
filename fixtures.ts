import { test as base, expect } from '@playwright/test';
import { getStandardUser } from './test-data/users';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page'; 

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedIn: void;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({page}, use) => {
    await use(new CheckoutPage(page));
  },
  loggedIn: async ({loginPage, inventoryPage}, use) =>{
    const user = getStandardUser();
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    await expect(inventoryPage.title).toHaveText('Products');
    await use();
  },
});

export { expect } from '@playwright/test';
