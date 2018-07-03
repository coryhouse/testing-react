import {
  CALCULATE_FUEL_SAVINGS,
  SAVE_FUEL_SAVINGS_SUCCESS
} from "../constants/actionTypes";
import {
  necessaryDataIsProvidedToCalculateSavings,
  calculateSavings
} from "../utils/fuelSavings";
import objectAssign from "object-assign";
import initialState from "./initialState";

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function fuelSavingsReducer(
  state = initialState.fuelSavings,
  action
) {
  let newState;

  switch (action.type) {
    case SAVE_FUEL_SAVINGS_SUCCESS:
      return state;

    case CALCULATE_FUEL_SAVINGS:
      newState = objectAssign({}, state);
      newState[action.fieldName] = action.value;
      newState.necessaryDataIsProvidedToCalculateSavings = necessaryDataIsProvidedToCalculateSavings(
        newState
      );
      newState.dateModified = action.dateModified;

      if (newState.necessaryDataIsProvidedToCalculateSavings) {
        newState.savings = calculateSavings(newState);
      }

      return newState;

    default:
      return state;
  }
}
