import React, { Component } from "react";

class ProfileCreds extends Component {
  render() {
    const { profile } = this.props;
    const { partner } = this.props.profile;

    const myInfo = (
      <li className="list-group-item">
        <p>
          <strong>Weekly Income:</strong> {profile.income}
        </p>
        <p>
          <strong>Weekly Expenses: </strong> {profile.expenses}
        </p>
      </li>
    );
    const partnerInfo = (
      <li className="list-group-item">
        <p>
          <strong>Weekly Income:</strong> {partner.partnerIncome}
        </p>
        <p>
          <strong>Weekly Expenses: </strong> {partner.partnerExpenses}
        </p>
      </li>
    );

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">My Info</h3>

          <ul className="list-group">{myInfo}</ul>
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Partner Info</h3>

          <ul className="list-group">{partnerInfo}</ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
