import Validator from "validatorjs";

const loginRule = {
  email: "required|string",
  password: "required|string",
};

const signUpRule = {
  email: "required|email",
  password: "required|string",
  cPassword: "required|string",
  name: "required|string",
};

const addressRule = {
  name: "required|string",
  email: "required|email",
  address: "required|string",
  city: "required|string",
  state: "required|string",
  zip: "required|digits:6",
};
const paymentRule = {
  name: "required|string",
  year: "required|digits:4",
  month: "required|string",
  number: "required|digits:10",
  cvv: "required|digits:3",
};

export const loginAllValidation = (data) => {
  const validation = new Validator(data, loginRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};

export const signUpAllValidation = (data) => {
  const validation = new Validator(data, signUpRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};

export const addressAllValidation = (data) => {
  const validation = new Validator(data, addressRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};
export const paymentAllValidation = (data) => {
  const validation = new Validator(data, paymentRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};
