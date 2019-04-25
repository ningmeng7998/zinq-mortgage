const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePropertyInput(data) {
  let errors = {};

  data.propertyValue = !isEmpty(data.propertyValue) ? data.propertyValue : "";
  data.deposit = !isEmpty(data.deposit) ? data.deposit : "";
  data.postCode = !isEmpty(data.postCode) ? data.postCode : "";

  if (Validator.isEmpty(data.propertyValue)) {
    errors.propertyValue = "Property Value field is required";
  } else if (isNaN(data.propertyValue)) {
    errors.propertyValue = "Your property value should be a number";
  } else if (Validator.isEmpty(data.deposit)) {
    errors.deposit = "Deposit field is required";
  } else if (isNaN(data.deposit)) {
    errors.deposit = "Your deposite should be a number";
  } else if (Validator.isEmpty(data.postCode)) {
    errors.postCode = "Postcode field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
