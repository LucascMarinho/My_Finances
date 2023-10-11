import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UserController, TransactionController } from "../controllers";

const router = Router();

//USERS
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

//TRANSACTIONS
router.get(
  "/transactions",
  TransactionController.getAllValidation,
  TransactionController.getAll
);
router.get(
  "/transactions/:id",
  TransactionController.getByIdValidation,
  TransactionController.getById
);

router.post(
  "/transactions",
  TransactionController.createValidation,
  TransactionController.create
);

router.put(
  "/transactions/:id",
  TransactionController.updateByIdValidation,
  TransactionController.updateById
);

router.put(
  "/transactions/delete-transaction/:id",
  TransactionController.deleteByIdValidation,
  TransactionController.deleteById
);

export { router };
