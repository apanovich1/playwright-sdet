import type {Locator, Page} from '@playwright/test';
import { Customer } from '../test-data/customers';

export class CheckoutPage{
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillInformation(customer : Customer) {
    await this.firstNameInput.fill(customer.name);
    await this.lastNameInput.fill(customer.surname);
    await this.postalCodeInput.fill(customer.postalCode);
    await this.continueButton.click();
  }
  
  async finishCheckout() {
    await this.finishButton.click();
  }
}