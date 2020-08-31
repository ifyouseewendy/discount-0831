import {Console} from 'as-wasi';
import {Checkout, Discount, Discounts} from '@shopify/extension-point-as-discount';
import {Money, Configuration, safeParseInt} from '@shopify/scripts-sdk-as';

export function run(input: Checkout, configuration: Configuration): Discounts {
  // Use `Console.log` to print output from your script.
  Console.log('Hello! This is a log from your script!');

  const configuredDiscountName = configuration.exists('name') ? configuration.get('name')! : 'Extension Discount';
  const configuredDiscountAmount = configuration.exists('amount')
    ? <f64>safeParseInt(configuration.get('amount')!)
    : 1.0;

  const discountArray: Array<Discount> = [];
  for (let i = 0; i < input.lineItems.length; i++) {
    const lineItem = input.lineItems[i];

    // Apply a discount of 1 unit in the line item's currency.
    // For example, when the currency is USD, apply a $1 discount)
    const discountAmount = Money.fromAmount(configuredDiscountAmount, lineItem.price.currency);
    discountArray.push(lineItem.discount(discountAmount, configuredDiscountName));
  }
  return Discounts.from(discountArray);
}
