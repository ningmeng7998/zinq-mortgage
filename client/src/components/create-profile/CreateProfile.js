import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfile } from "../../actions/profileActions";

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
    // console.log(
    //   "income" + profileData.income + "expenses" + profileData.expenses
    // );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name + e.target.value);
  }

  render() {
    const { errors, displayPartnerInputs } = this.state;

    let partnerInputs;

    if (displayPartnerInputs) {
      partnerInputs = (
        <div>
          <TextFieldGroup
            placeholder="* Your Partner's Weekly Income"
            name="partnerIncome"
            value={this.state.partnerIncome}
            onChange={this.onChange}
            // info="Your partner's income"
          />
          <TextFieldGroup
            placeholder="Your Partner's Weekly Expenses"
            name="partnerExpenses"
            value={this.state.partnerExpenses}
            onChange={this.onChange}
            // info="Your partner's expenses"
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile </h1>

              <p className="lead text-center">
                Plese add some information so that we can assist you.
              </p>
              <small className="d-block pb-3">* = required fields </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Your Username"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Once set, this username cannot be changed."
                />
                <TextFieldGroup
                  placeholder="* Firstname"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  error={errors.firstName}
                />
                <TextFieldGroup
                  placeholder=" Middle name"
                  name="middleName"
                  value={this.state.middleName}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Lastname"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                />
                <h6>* Date of Birth</h6>
                <TextFieldGroup
                  name="dateOfBirth"
                  type="date"
                  value={this.state.dateOfBirth}
                  onChange={this.onChange}
                  error={errors.dateOfBirth}
                />

                <TextFieldGroup
                  placeholder="* Your Weekly Income"
                  name="income"
                  value={this.state.income}
                  onChange={this.onChange}
                  error={errors.income}
                  // info="Your weekly income"
                />

                <TextFieldGroup
                  placeholder="* Your Weekly Expenses"
                  name="expenses"
                  value={this.state.expenses}
                  onChange={this.onChange}
                  error={errors.expenses}
                  // info="Your weekly expenses"
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
                    Add Partner Information
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
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
