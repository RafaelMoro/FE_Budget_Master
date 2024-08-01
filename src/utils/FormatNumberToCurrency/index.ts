const CURRENCY = 'currency';
const USD_CURRENCY = 'USD';

const usDollar = Intl.NumberFormat('en-US', {
  style: CURRENCY,
  currency: USD_CURRENCY,
  minimumFractionDigits: 2,
});

/*
* This function formats a number to usd or mexican currency.
* The props are:
*   amount: amount as number
*   currency: it can only be 'USD' or 'MXN'
* It returns the number formatted.
*/

interface FormatValueToCurrencyProps {
  amount: number | string;
  hasNoDecimals?: boolean;
  hasNoCurrencySign?: boolean;
}

export const formatValueToCurrency = ({
  amount, hasNoCurrencySign = false, hasNoDecimals = false,
}: FormatValueToCurrencyProps): string => {
  const transformedAmount = typeof amount === 'number' ? amount : Number(amount);
  const amountCurrency = usDollar.format(transformedAmount);
  if (hasNoDecimals) {
    // Returns the value and the decimals = [value, decimals]
    const [currentValue] = amountCurrency.split('.');
    if (hasNoCurrencySign) {
      return currentValue.replace('$', '');
    }
    return currentValue;
  }
  if (hasNoCurrencySign) {
    return amountCurrency.replace('$', '');
  }
  return amountCurrency;
};
