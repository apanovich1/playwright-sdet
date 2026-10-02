import type {Locator, Page} from '@playwright/test';

export class CartPage{
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(private page: Page) {
    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
  }
  async checkout() {
    await this.checkoutButton.click();
  }
}

