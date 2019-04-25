import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Property from "./Property";
import Education from "./Education";
import Calculator from "./Calculator";

class Dashboard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.calculateDepositToPropertyValueRatio = this.calculateDepositToPropertyValueRatio.bind(
  //     this
  //   );
  //   this.calculateExpenseToIncomeRatio = this.calculateExpenseToIncomeRatio.bind(
  //     this
  //   );
  //   this.findResult = this.findResult.bind(this);
  // }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  // calculateExpenseToIncomeRatio(
  //   income,
  //   expenses,
  //   partnerIncome,
  //   partnerExpenses
  // ) {
  //   return (partnerExpenses + expenses) / (partnerIncome + income);
  // }

  // calculateDepositToPropertyValueRatio(deposit, propertyValue) {
  //   return deposit / propertyValue;
  // }

  // findResult(x, y) {
  //   if (x <= 0.5 && y >= 0.2) {
  //     return "Congratulations! We can help you. ";
  //   } else {
  //     return "Please give us a call for further assistance. ";
  //   }
  // }

  render() {
    //Make sure profile is not an empty object before we try to render anything
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text=muted">
              <Link to={`/profile/${profile.handle}`}>
                Welcome, {profile.firstName} {profile.lastName}
              </Link>
            </p>
            <ProfileActions />
            <Property property={profile.property} />
            {/* <Education education={profile.education} /> */}
            <Calculator profile={profile} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        //user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text=muted">Welcome, {user.name} </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div>
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

//It should take a first argument called state, optionally a second argument called ownProps, and return a plain object containing the data that the connected component needs.

//The first argument to a mapStateToProps function is the entire Redux store state (the same value returned by a call to store.getState()). Because of this, the first argument is traditionally just called state. (While you can give the argument any name you want, calling it store would be incorrect - it's the "state value", not the "store instance".)
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

// function mapStateToProps(state){
//   return {
//     profile: state.profile,
//     auth: state.auth
//   }
// }

//The connect() function connects a React component to a Redux store.
//It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.
//Connect state.profile, state.auth and getCurrentProfile function to component Dashboard
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
