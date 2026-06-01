import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();
router.get(//get all fighters
  "/",
  (req, res, next) => {
    try {
      const data = fighterService.getAll();
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.get(//get fighter by id
  "/:id",
  (req, res, next) => {
    try {
      const data = fighterService.getOne(req.params.id);
      if (!data) {
        throw new Error("Fighter not found");
      }
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();//if there is an error we pass it to our responseMiddleware, otherwise we pass the data to responseMiddleware
    }
  },
  responseMiddleware
);
router.post(//create new fighter
  "/",
  createFighterValid,//check if the required fields for creating a fighter are valid
  (req, res, next) => {
    try {//if there is an error in validation middleware we skip the creation process
      if (res.err) return next();

      const data = fighterService.create(req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.patch(//update fighter by id
  "/:id",
  updateFighterValid,//check if the required fields for updating a fighter are valid
  (req, res, next) => {
    try {
      if (res.err) return next();
      const data = fighterService.update(req.params.id, req.body);
      if (!data) {
        throw new Error("Fighter not found");
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
router.delete(//delete fighter by id
  "/:id",
  (req, res, next) => {
    try {
      const data = fighterService.delete(req.params.id);
      if (!data) {
        throw new Error("Fighter not found");
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