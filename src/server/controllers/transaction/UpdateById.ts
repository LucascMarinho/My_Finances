import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models";
import { UsersProvider } from "../../database/providers/user";

interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<IUser, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      age: yup.number().required().integer().min(18),
      email: yup.string().required().email(),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamsProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: "User not found.",
      },
    });
  }
  const result = await UsersProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
