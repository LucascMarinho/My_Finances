import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UserController } from "../controllers";

const router = Router();

router.post("/create-user", UserController.validator, UserController.create);

export { router };
