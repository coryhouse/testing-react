import * as ActionTypes from "../constants/actionTypes";

import MockDate from "mockdate";
import configureStore from "./configureStore";

import { calculateSavings } from "../utils/fuelSavings";
import { getFormattedDateTime } from "../utils/dates";

describe("Store", () => {
  let dateModified;
  beforeAll(() => {
    // hardcoded date for consistency in tests and snapshots on all machines
    MockDate.set(new Date("1/31 23:14:01"));
    dateModified = getFormattedDateTime();
  });
  afterAll(() => MockDate.reset());

  it("should display results when necessary data is provided", () => {
    const store = configureStore();

    const actions = [
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "newMpg",
        value: 20
      },
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "tradeMpg",
        value: 10
      },
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "newPpg",
        value: 1.5
      },
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "tradePpg",
        value: 1.5
      },
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "milesDriven",
        value: 100
      },
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "milesDrivenTimeframe",
        value: "month"
      }
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      newMpg: 20,
      tradeMpg: 10,
      newPpg: 1.5,
      tradePpg: 1.5,
      milesDriven: 100,
      milesDrivenTimeframe: "month",
      displayResults: false,
      dateModified,
      necessaryDataIsProvidedToCalculateSavings: true,
      savings: calculateSavings(store.getState().fuelSavings)
    };

    expect(actual.fuelSavings).toEqual(expected);
  });

  it("should not display results when necessary data is not provided", () => {
    const store = configureStore();

    const actions = [
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "newMpg",
        value: 20
      },
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "tradeMpg",
        value: 10
      },
      // { type: ActionTypes.CALCULATE_FUEL_SAVINGS, dateModified, settings: store.getState(), fieldName: 'newPpg', value: 1.50 },
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "tradePpg",
        value: 1.5
      },
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "milesDriven",
        value: 100
      },
      {
        type: ActionTypes.CALCULATE_FUEL_SAVINGS,
        dateModified,
        settings: store.getState(),
        fieldName: "milesDrivenTimeframe",
        value: "month"
      }
    ];

    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();

    const expected = {
      newMpg: 20,
      tradeMpg: 10,
      newPpg: "",
      tradePpg: 1.5,
      milesDriven: 100,
      milesDrivenTimeframe: "month",
      displayResults: false,
      dateModified,
      necessaryDataIsProvidedToCalculateSavings: false,
      savings: { annual: 0, monthly: 0, threeYear: 0 }
    };

    expect(actual.fuelSavings).toEqual(expected);
  });
});
