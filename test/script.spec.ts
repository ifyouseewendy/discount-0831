import {Money, Currencies} from '@shopify/scripts-sdk-as';
import {Checkout, TestHelper} from '@shopify/extension-point-as-discount';
import {TestHelper as SdkTestHelper} from '@shopify/scripts-sdk-as';
import {run} from 'script';

/**
 * This function uses builder classes from TestHelper
 * to make it easier to create fake input objects such as
 * a Checkout. Edit this function or create copies to define
 * your own custom checkout objects to test against.
 */
function createFakeCheckout(): Checkout {
  return new TestHelper.CheckoutBuilder()
    .setLines([
      TestHelper.CheckoutBuilder.line(
        new TestHelper.VariantBuilder()
          .withProduct(new TestHelper.ProductBuilder().titled('Red Delicious').addTag('fruits').buildWithId(1))
          .pricedAt(Money.fromAmount(2, Currencies.CAD))
          .buildWithId(1),
        1,
      ),
      TestHelper.CheckoutBuilder.line(
        new TestHelper.VariantBuilder()
          .withProduct(new TestHelper.ProductBuilder().titled('Florida').addTag('fruits').buildWithId(2))
          .pricedAt(Money.fromAmount(3, Currencies.CAD))
          .buildWithId(2),
        1,
      ),
    ])
    .build();
}

describe('run', () => {
  it('Should apply a discount of 1 to every line item', () => {
    const input: Checkout = createFakeCheckout();

    const expectedDiscountValues = [Money.fromAmount(10, Currencies.CAD), Money.fromAmount(10, Currencies.CAD)];
    const expectedDiscountTitles = ['Test Extension Discount', 'Test Extension Discount'];

    const actualDiscounts = run(
      input,
      new SdkTestHelper.ConfigurationBuilder()
        .withValue('name', 'Test Extension Discount')
        .withValue('amount', '10')
        .build(),
    );

    // Refer to https://tenner-joshua.gitbook.io/as-pect/as-api
    // to learn about the as-pect API.
    expect<Array<Money>>(actualDiscounts.map<Money>((d) => d.value)).toStrictEqual(expectedDiscountValues);
    expect<Array<string>>(actualDiscounts.map<string>((d) => d.title)).toStrictEqual(expectedDiscountTitles);

    // Use as-pect's `log` function to log output to your console
    log('Hello! This is a log from your test!');
  });
});
