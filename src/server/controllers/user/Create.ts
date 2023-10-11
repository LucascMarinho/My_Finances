import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models";
import { UsersProvider } from "../../database/providers/user";

interface IBodyProps extends Omit<IUser, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      age: yup.number().required().integer().min(18),
      email: yup.string().required().email(),
    })
  ),
}));

export const create = async (req: Request<{}, {}, IUser>, res: Response) => {
  const result = await UsersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
