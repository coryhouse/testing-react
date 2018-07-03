// Centralized propType definitions
import { shape, number, bool, string, oneOf } from "prop-types";

export const savings = shape({
  monthly: oneOf[(number, string)],
  annual: oneOf[(number, string)],
  threeYear: oneOf[(number, string)]
});

export const fuelSavings = shape({
  newMpg: oneOf[(number, string)],
  tradeMpg: oneOf[(number, string)],
  newPpg: oneOf[(number, string)],
  tradePpg: oneOf[(number, string)],
  milesDriven: oneOf[(number, string)],
  milesDrivenTimeframe: string,
  displayResult: bool,
  dateModified: string,
  necessaryDataIsProvidedToCalculateSavings: bool,
  savings: savings
});
