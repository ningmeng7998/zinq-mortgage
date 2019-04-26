import React, { Component } from "react";

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
      return (
        <div className="card card-body bg-info text-white mb-3">
          Congratulations! We can help you.{" "}
        </div>
      );
    } else {
      return (
        <div className="card card-body bg-info text-white mb-3">
          Please give us a call for further assistance.{" "}
        </div>
      );
    }
  }

  render() {
    const { profile } = this.props;
    let output = "";
    let totalPropertyValue = 1;
    let totalDeposit = 0;
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
      output = (
        <div className="card card-body bg-info text-white mb-3">
          <h1>Oops! Please add your property information for analysis. </h1>
        </div>
      );
    } else {
      profile.property.map(property => {
        totalPropertyValue += parseFloat(property.propertyValue);
        totalDeposit += parseFloat(property.deposit);
      });

      propertyRatio = totalDeposit / totalPropertyValue;
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
