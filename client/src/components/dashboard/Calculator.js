import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.calculateDepositToPropertyValueRatio = this.calculateDepositToPropertyValueRatio.bind(
      this
    );
    this.calculateExpenseToIncomeRatio = this.calculateExpenseToIncomeRatio.bind(
      this
    );
    this.findResult = this.findResult.bind(this);
  }

  calculateExpenseToIncomeRatio(
    income,
    expenses,
    partnerIncome,
    partnerExpenses
  ) {
    return (partnerExpenses + expenses) / (partnerIncome + income);
  }

  calculateDepositToPropertyValueRatio(deposit, propertyValue) {
    return deposit / propertyValue;
  }

  findResult(x, y) {
    if (x <= 0.5 && y >= 0.2) {
      return "Congratulations! We can help you. ";
    } else {
      return "Please give us a call for further assistance. ";
    }
  }

  render() {
    const { profile } = this.props;
    let output = "";
    let propertyValue = 1;
    let deposit = 0;
    let propertyRatio = 1;
    let income = profile.income ? profile.income : 0;
    let expenses = profile.expenses ? profile.expenses : 0;
    let partnerIncome = profile.partner.partnerIncome
      ? profile.partner.partnerIncome
      : 0;
    let partnerExpenses = profile.partner.partnerExpenses
      ? profile.partner.partnerExpenses
      : 0;

    let inToOutRatio = this.calculateExpenseToIncomeRatio(
      income,
      expenses,
      partnerIncome,
      partnerExpenses
    );

    if (profile.property.length === 0) {
      output = <h1>Please add your property inforamtion</h1>;
    } else {
      profile.property.map(property => {
        propertyValue += property.propertyValue;
        deposit += property.deposit;
      });

      propertyRatio = deposit / propertyValue;
      output = <h1>{this.findResult(inToOutRatio, propertyRatio)}</h1>;
    }

    return (
      <div>
        <h4 className="mb-4">Analysis Result</h4>
        {output}
      </div>
    );
  }
}
