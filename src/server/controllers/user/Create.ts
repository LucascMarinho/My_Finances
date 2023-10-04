import { Request, Response } from "express";
import * as yup from "yup";

import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";

interface IUser {
  name: string;
  age: number;
  email: string;
}

export const createValidation = validation((getSchema) => ({
  body: yup.object().shape({
    name: yup.string().required().min(3),
    age: yup.number().required().integer().min(18),
    email: yup.string().required().email(),
  }),
}));

export const create = async (req: Request<{}, {}, IUser>, res: Response) => {
  return res.status(StatusCodes.CREATED).send("User created successfully!");
};
