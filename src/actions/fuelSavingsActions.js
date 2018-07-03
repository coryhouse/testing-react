import * as types from "../constants/actionTypes";
import { save } from "../api/fuelSavingsApi";

import { getFormattedDateTime } from "../utils/dates";

// Action creators
function saveFuelSavingsRequest() {
  return {
    type: types.SAVE_FUEL_SAVINGS_REQUEST
  };
}

function saveFuelSavingsSuccess(settings) {
  return {
    type: types.SAVE_FUEL_SAVINGS_SUCCESS,
    dateModified: getFormattedDateTime(),
    settings
  };
}

export function calculateFuelSavings(settings, fieldName, value) {
  return {
    type: types.CALCULATE_FUEL_SAVINGS,
    dateModified: getFormattedDateTime(),
    settings,
    fieldName,
    value
  };
}

// Thunk with the redux-thunk middleware
// Thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
export function saveFuelSavings(settings) {
  return function(dispatch) {
    dispatch(saveFuelSavingsRequest());
    return save(settings).then(results =>
      dispatch(saveFuelSavingsSuccess(results.data))
    );
  };
}
