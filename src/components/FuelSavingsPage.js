import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/fuelSavingsActions";
import FuelSavingsForm from "./FuelSavingsForm";

export class FuelSavingsPage extends React.Component {
  state = {
    saveCompleted: false
  };

  saveFuelSavings = () => {
    this.setState({saveCompleted: true});
    this.props.actions.saveFuelSavings(this.props.fuelSavings);
  };

  calculateFuelSavings = e => {
    this.props.actions.calculateFuelSavings(
      this.props.fuelSavings,
      e.target.name,
      e.target.value
    );
  };

  render() {
    return (
      <div>
        <FuelSavingsForm
          onSaveClick={this.saveFuelSavings}
          onChange={this.calculateFuelSavings}
          fuelSavings={this.props.fuelSavings}
          saveCompleted={this.state.saveCompleted}
        />
      </div>
    );
  }
}

FuelSavingsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelSavingsPage);
