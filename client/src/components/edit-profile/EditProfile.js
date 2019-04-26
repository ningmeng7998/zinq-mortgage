import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/isEmpty";
import Moment from "react-moment";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPartnerInputs: false,
      handle: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      income: "",
      expenses: "",
      partnerIncome: "",
      partnerExpenses: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.dateOfBirth = !isEmpty(profile.dateOfBirth)
        ? profile.dateOfBirth
        : "";

      profile.firstName = !isEmpty(profile.firstName) ? profile.firstName : "";
      profile.middleName = !isEmpty(profile.middleName)
        ? profile.middleName
        : "";
      profile.lastName = !isEmpty(profile.lastName) ? profile.lastName : "";
      profile.income = !isEmpty(profile.income) ? profile.income : "";
      profile.expenses = !isEmpty(profile.expenses) ? profile.expenses : "";

      profile.partner = !isEmpty(profile.partner) ? profile.partner : {};
      profile.partnerIncome = !isEmpty(profile.partner.partnerIncome)
        ? profile.partner.partnerIncome
        : "";
      profile.partnerExpenses = !isEmpty(profile.partner.partnerExpenses)
        ? profile.partner.partnerExpenses
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        firstName: profile.firstName,
        middleName: profile.middleName,
        lastName: profile.lastName,
        dateOfBirth: profile.dateOfBirth,
        income: profile.income,
        expenses: profile.expenses,
        partnerIncome: profile.partnerIncome,
        partnerExpenses: profile.partnerExpenses
      });
      console.log("this.state.income" + this.state.income);
      console.log("this.state.expenses" + this.state.expenses);
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.dateOfBirth,
      income: this.state.income,
      expenses: this.state.expenses,
      partnerIncome: this.state.partnerIncome,
      partnerExpenses: this.state.partnerExpenses
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displayPartnerInputs } = this.state;

    let partnerInputs;

    if (displayPartnerInputs) {
      partnerInputs = (
        <div>
          <TextFieldGroup
            placeholder="Partner Income"
            name="partnerIncome"
            value={this.state.partnerIncome}
            onChange={this.onChange}
            info="Your partner's income"
            error={errors.partnerIncome}
          />

          <TextFieldGroup
            placeholder="Partner Expenses"
            name="partnerExpenses"
            value={this.state.partnerExpenses}
            onChange={this.onChange}
            info="Your partner's expenses"
            error={errors.partnerExpenses}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <h5>User Name</h5>
                <table>
                  <tbody>
                    <tr>
                      <td>{this.state.handle}</td>
                    </tr>
                  </tbody>
                </table>
                <h5>Date of Birth</h5>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Moment format="YYYY/MM/DD">
                          {this.state.dateOfBirth}
                        </Moment>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <br />
                <TextFieldGroup
                  placeholder="* Firstname"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  error={errors.firstName}
                  info="Your first name"
                />
                <TextFieldGroup
                  placeholder=" Middle name"
                  name="middleName"
                  value={this.state.middleName}
                  onChange={this.onChange}
                  info="Your middle name"
                />
                <TextFieldGroup
                  placeholder="* Lastname"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                  info="Your last name"
                />
                <TextFieldGroup
                  placeholder="Income"
                  name="income"
                  value={this.state.income}
                  onChange={this.onChange}
                  error={errors.income}
                  info="Your income"
                />
                <TextFieldGroup
                  placeholder="Expenses"
                  name="expenses"
                  value={this.state.expenses}
                  onChange={this.onChange}
                  error={errors.expenses}
                  info="Your expenses"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displayPartnerInputs: !prevState.displayPartnerInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Edit Partner Information
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {partnerInputs}
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
