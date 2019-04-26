import React, { Component } from "react";
//If we want to redirect from an action, we need withRouter
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProperty } from "../../actions/profileActions";

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyValue: "",
      deposit: "",
      postCode: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const expData = {
      propertyValue: this.state.propertyValue,
      deposit: this.state.deposit,
      postCode: this.state.postCode
    };
    //Redirect to previous page
    this.props.addProperty(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-property">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Property</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Property Value"
                  name="propertyValue"
                  value={this.state.propertyValue}
                  onChange={this.onChange}
                  error={errors.propertyValue}
                />
                <TextFieldGroup
                  placeholder="* Deposit"
                  name="deposit"
                  value={this.state.deposit}
                  onChange={this.onChange}
                  error={errors.deposit}
                />
                <TextFieldGroup
                  placeholder="Postcode"
                  name="postCode"
                  value={this.state.postCode}
                  onChange={this.onChange}
                  error={errors.postCode}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProperty.propTypes = {
  addProperty: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProperty }
)(withRouter(AddProperty));
