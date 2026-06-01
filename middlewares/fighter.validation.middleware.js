import { FIGHTER } from "../models/fighter.js";

const validateFighterFields = (body) => {//validation function for both create and update operations
  if ("id" in body) {//id should not be present in body for both create and update operations
    return "Id should not be present in body";
  }
  const bodyKeys = Object.keys(body);//filtering out id from body keys to check for extra fields
  const allowedKeys = Object.keys(FIGHTER).filter((key) => key !== "id");
  const hasExtraFields = bodyKeys.some((key) => !allowedKeys.includes(key));
  if (hasExtraFields) {
    return "Extra properties are not allowed";
  }
  if (body.name !== undefined && (typeof body.name !== "string" || body.name.trim() === "")) {//name should be a non-empty string if it is present in body
    return "Name must be a non-empty string";
  }
  if (body.power !== undefined) {//power should be a number between 1 and 100 if it is present in body
    if (typeof body.power !== "number" || body.power < 1 || body.power > 100) {
      return "Power must be a number between 1 and 100";
    }
  }
  if (body.defense !== undefined) {//defense should be a number between 1 and 10 if it is present in body
    if (typeof body.defense !== "number" || body.defense < 1 || body.defense > 10) {
      return "Defense must be a number between 1 and 10";
    }
  }
  if (body.health !== undefined) {//health should be a number between 80 and 120 if it is present in body
    if (typeof body.health !== "number" || body.health < 80 || body.health > 120) {
      return "Health must be a number between 80 and 120";
    }
  }
  return null;
};
const createFighterValid = (req, res, next) => {
  const { name, power, defense } = req.body;
  if (name === undefined || power === undefined || defense === undefined) {//name, power and defense should be present in body for create operation
    return res.status(400).json({
      error: true,
      message: "Fighter entity to create isn't valid",
    });
  }
  const validationError = validateFighterFields(req.body);
  if (validationError) {
    return res.status(400).json({
      error: true,
      message: "Fighter entity to create isn't valid",
    });
  }
  next();
};
const updateFighterValid = (req, res, next) => {
  const bodyKeys = Object.keys(req.body).filter(key => key !== 'id');//id should not be present in body for update operation
  
  if (bodyKeys.length === 0) {
    return res.status(400).json({
      error: true,
      message: "Fighter entity to update isn't valid",
    });
  }
  const validationError = validateFighterFields(req.body);
  if (validationError) {
    return res.status(400).json({
      error: true,
      message: "Fighter entity to update isn't valid",
    });
  }
  next();
};
export { createFighterValid, updateFighterValid };