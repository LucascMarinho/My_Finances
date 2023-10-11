import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { ITransaction } from "../../database/models";
import { TransactionsProvider } from "../../database/providers/transaction";

interface IBodyProps extends Omit<ITransaction, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      userId: yup.number().required().moreThan(0),
      type: yup.string().required(),
      amount: yup.number().required().moreThan(0),
      tag: yup.string().required(),
      description: yup.string().required(),
      note: yup.string().notRequired(),
      date: yup.string().required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, ITransaction>,
  res: Response
) => {
  const result = await TransactionsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
