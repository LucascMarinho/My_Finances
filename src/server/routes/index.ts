import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UserController } from "../controllers";

const router = Router();

router.get("/users", UserController.getAllValidation, UserController.getAll);
router.get(
  "/users/:id",
  UserController.getByIdValidation,
  UserController.getById
);

router.post("/users", UserController.createValidation, UserController.create);

router.put(
  "/users/:id",
  UserController.updateByIdValidation,
  UserController.updateById
);

router.put(
  "/users/disable-user/:id",
  UserController.deleteByIdValidation,
  UserController.deleteById
);

export { router };
