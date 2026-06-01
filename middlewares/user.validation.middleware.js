import { USER } from "../models/user.js";

const validateUserFields = (body) => {//validation function for both create and update operations
  if ("id" in body) {//id should not be present in body for both create and update operations
    return "Id should not be present in body";
  }
  const bodyKeys = Object.keys(body);//filtering out id from body keys to check for extra fields
  const allowedKeys = Object.keys(USER).filter((key) => key !== "id");
  const hasExtraFields = bodyKeys.some((key) => !allowedKeys.includes(key));
  if (hasExtraFields) {
    return "Extra properties are not allowed";
  }
  if (body.email !== undefined) {//email should be a valid @gmail.com address if it is present in body
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(body.email)) {
      return "Email must be a valid @gmail.com address";
    }
  }
  if (body.phone !== undefined) {//phone should match +380xxxxxxxxx format if it is present in body
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(body.phone)) {
      return "Phone must match +380xxxxxxxxx format";
    }
  }
  if (body.password !== undefined) {//password should be a string with min 3 characters if it is present in body
    if (typeof body.password !== "string" || body.password.length < 3) {
      return "Password must be a string with min 3 characters";
    }
  }
  return null;
};
const createUserValid = (req, res, next) => {
  const allowedKeys = Object.keys(USER).filter((key) => key !== "id");
  const hasAllFields = allowedKeys.every(//check if all required fields are present in body and are not empty
    (key) => req.body[key] !== undefined && req.body[key] !== ""
  );
  if (!hasAllFields) {
    res.err = new Error("User entity to create isn't valid");
    return next();
  }
  const validationError = validateUserFields(req.body);//check if there are any validation errors in body fields
  if (validationError) {
    res.err = new Error("User entity to create isn't valid");
    return next();
  }
  next();//if there are no validation errors we proceed to next middleware or route handler
};
const updateUserValid = (req, res, next) => {//id should not be present in body for update operation
  const bodyKeys = Object.keys(req.body).filter((key) => key !== "id");
  if (bodyKeys.length === 0) {//at least one field from model (except id) should be present in body for update operation
    res.err = new Error("User entity to update isn't valid");
    return next();
  }
  const validationError = validateUserFields(req.body);
  if (validationError) {//check if there are any validation errors in body fields
    res.err = new Error("User entity to update isn't valid");
    return next();
  }
  next();
};
export { createUserValid, updateUserValid };