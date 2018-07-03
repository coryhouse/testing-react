import * as actionTypes from "../constants/actionTypes";
import * as actions from "./fuelSavingsActions";
import initialState from "../reducers/initialState";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import MockDate from "mockdate";
import { getAxiosApi } from "../api/fuelSavingsApi";
import { getFormattedDateTime } from "../utils/dates";

describe("Actions", () => {
  let dateModified;
  beforeAll(() => {
    MockDate.set(new Date());
    dateModified = getFormattedDateTime();
  });
  afterAll(() => MockDate.reset());

  const appState = {
    newMpg: 20,
    tradeMpg: 20,
    newPpg: 1.5,
    tradePpg: 1.5,
    milesDriven: 100,
    milesDrivenTimeframe: "week",
    displayResults: true,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: true,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  };

  it("should create SAVE_FUEL_SAVINGS_SUCCESS when saving is complete", () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const mockResponse = {
      newMpg: 1,
      tradeMpg: 1,
      newPpg: 1,
      tradePpg: 1,
      milesDriven: 100,
      milesDrivenTimeframe: "week",
      dateModified: `${new Date()}`
    };

    // This sets the mock adapter on the default instance
    var mock = new MockAdapter(getAxiosApi());
    mock.onPost().reply(201, mockResponse);

    const expectedActions = [
      { type: actionTypes.SAVE_FUEL_SAVINGS_REQUEST },
      {
        type: actionTypes.SAVE_FUEL_SAVINGS_SUCCESS,
        settings: mockResponse,
        dateModified
      }
    ];

    const store = mockStore({ fuelSavings: initialState }, expectedActions);

    return store.dispatch(actions.saveFuelSavings(appState)).then(() => {
      // return of async action
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create an action to calculate fuel savings", () => {
    const fieldName = "newMpg";
    const value = 100;
    const actual = actions.calculateFuelSavings(appState, fieldName, value);
    const expected = {
      type: actionTypes.CALCULATE_FUEL_SAVINGS,
      dateModified,
      settings: appState,
      fieldName,
      value
    };

    expect(actual).toEqual(expected);
  });
});
