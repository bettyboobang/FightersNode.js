import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();
router.get(//get all fights
  "/",
  (req, res, next) => {
    try {//call the getAll method from fightersService and store the result in res.data for our responseMiddleware
      const data = fightersService.getAll();
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.get(//get fight by id
  "/:id",
  (req, res, next) => {
    try {//
      const data = fightersService.getOne(req.params.id);
      if (!data) {
        throw new Error("Fight not found");
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
router.post(//create new fight
  "/",
  (req, res, next) => {
    try {//call the create method from fightersService with request body and store the result in res.data for our responseMiddleware
      const data = fightersService.create(req.body);
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