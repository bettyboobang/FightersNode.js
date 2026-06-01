import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();
router.post(
  "/login",
  (req, res, next) => {
    try {//call the login method from authService with request body and store the result
      const data = authService.login(req.body);
      res.data = data;//if login is successful we store the returned data in res.data for our responseMiddleware
    } catch (err) {//if there is an error during login we store the error in res.err for our responseMiddleware
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
export { router };