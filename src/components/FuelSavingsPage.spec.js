import React from "react";
import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedFuelSavingsPage, { FuelSavingsPage } from "./FuelSavingsPage";
import FuelSavingsForm from "./FuelSavingsForm";
import initialState from "../reducers/initialState";
import { necessaryDataIsProvidedToCalculateSavings } from "../utils/fuelSavings";

describe("<FuelSavingsPage />", () => {
  const actions = {
    saveFuelSavings: jest.fn(),
    calculateFuelSavings: jest.fn()
  };

  it("should contain <FuelSavingsForm />", () => {
    const wrapper = shallow(
      <FuelSavingsPage
        actions={actions}
        fuelSavings={initialState.fuelSavings}
      />
    );

    expect(wrapper.find(FuelSavingsForm).length).toEqual(1);
  });

  it("calls saveFuelSavings upon clicking save", () => {
    const fuelSavings = {
      newMpg: 21,
      tradeMpg: 21,
      newPpg: 2,
      tradePpg: 4,
      milesDriven: 45950,
      milesDrivenTimeframe: "week",
      displayResults: true,
      necessaryDataIsProvidedToCalculateSavings: true,
      savings: {
        monthly: 0,
        annual: 0,
        threeYear: 0
      }
    };

    const wrapper = mount(
      <FuelSavingsPage actions={actions} fuelSavings={fuelSavings} />
    );

    const save = wrapper.find("#save");
    save.simulate("click");

    expect(actions.saveFuelSavings).toHaveBeenCalledWith(fuelSavings);
  });

  it("calls calculateFuelSavings upon changing a field", () => {
    const wrapper = mount(
      <FuelSavingsPage
        actions={actions}
        fuelSavings={initialState.fuelSavings}
      />
    );
    const name = "newMpg";
    const value = 10;

    const input = wrapper.find('input[name="newMpg"]');
    input.simulate("change", { target: { name, value } });

    expect(actions.calculateFuelSavings).toHaveBeenCalledWith(
      initialState.fuelSavings,
      name,
      value
    );
  });

  it("should match snapshot", () => {
    const store = configureMockStore()(initialState);
    const component = create(
      <Provider store={store}>
        <ConnectedFuelSavingsPage />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
