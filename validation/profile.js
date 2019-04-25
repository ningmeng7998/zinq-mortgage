//use the validator module for validation
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  //Since the validator module only checks the empty string, we need to use our custormised isEmty function to convert empty-anything to an empty string
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.middleName = !isEmpty(data.middleName) ? data.middleName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
  data.income = !isEmpty(data.income) ? data.income : "";
  data.expenses = !isEmpty(data.expenses) ? data.expenses : "";
  data.partnerIncome = !isEmpty(data.partnerIncome) ? data.partnerIncome : "";
  data.partnerExpenses = !isEmpty(data.partnerExpenses)
    ? data.partnerExpenses
    : "";

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "User name is required.";
  } else if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 40 characters";
  } else if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name is required ";
  } else if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name is required ";
  } else if (Validator.isEmpty(data.dateOfBirth)) {
    errors.dateOfBirth = "Date Of Birth is required";
  } else if (Validator.isEmpty(data.income)) {
    errors.income = "Your income is required";
  } else if (isNaN(data.income)) {
    errors.income = "Your income should be a number";
  } else if (Validator.isEmpty(data.expenses)) {
    errors.expenses = "Your expenses is required";
  } else if (isNaN(data.expenses)) {
    errors.expenses = "Your expenses should be a number";
  } else if (isNaN(data.partnerIncome)) {
    errors.partnerIncome = "Partner income should be a number";
  } else if (isNaN(data.partnerExpenses)) {
    errors.partnerExpenses = "Partner expenses should be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
