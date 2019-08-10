import { roundNumber } from "./math";

export function getCurrencyFormattedNumber(value) {
  if (!value) {
    return "$0";
  }

  return "$" + getFormattedNumber(value); // eslint-disable-line prefer-template
}

export function getFormattedNumber(value) {
  if (value === 0) {
    return 0;
  }

  if (!isInt(scrubFormatting(value))) {
    return null; // if it's not a number after scrubbing formatting, just return null.
  }

  let roundedValue = roundNumber(value, 2); // round if more than 2 decimal points
  roundedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // add commas for 1,000's. RegEx from http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  const roundedValueContainsDecimalPlace = roundedValue.indexOf(".") !== -1;

  if (roundedValueContainsDecimalPlace) {
    const numbersToTheRightOfDecimal = roundedValue.split(".")[1];

    switch (numbersToTheRightOfDecimal.length) {
      case 1:
        return `${roundedValue}0`;
      default:
        return roundedValue;
    }
  }
  return roundedValue;
}

export function isInt(n) {
  if (n === "" || n === null) {
    return false;
  }

  return n % 1 === 0;
}

export function scrubFormatting(value) {
  if (value === null || value === undefined) {
    return null
  }
  return value
    .toString()
    .replace("$", "")
    .replace(",", "")
    .replace(".", "");
}
