import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();
router.get(//get all users
  "/",
  (req, res, next) => {
    try {
      const data = userService.getAll();
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.get(//get user by id
  "/:id",
  (req, res, next) => {
    try {
      const data = userService.getOne(req.params.id);
      if (!data) {
        throw new Error("User not found");
      }
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.post(//create new user
  "/",
  createUserValid,//check if the required fields for creating a user are valid
  (req, res, next) => {
    try {//if there is an error in validation middleware we skip the creation process
      if (res.err) return next();
      const data = userService.create(req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.patch(//update user by id
  "/:id",
  updateUserValid,//check if the required fields for updating a user are valid
  (req, res, next) => {
    try {//if there is an error in validation middleware we skip the update process
      if (res.err) return next();
      const data = userService.update(req.params.id, req.body);//update user by id with request body fields
      if (!data) {
        throw new Error("User not found");
      }
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.delete(//delete user by id
  "/:id",
  (req, res, next) => {
    try {//delete user by id and return the deleted data
      const data = userService.delete(req.params.id);//if there is no user with such id we throw an error
      if (!data) {
        throw new Error("User not found");
      }
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
export { router };
