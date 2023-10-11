import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { ITransaction } from "../../database/models";
import { TransactionsProvider } from "../../database/providers/transaction";

interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<ITransaction, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
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

export const updateById = async (
  req: Request<IParamsProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: "Transaction not found.",
      },
    });
  }
  const result = await TransactionsProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
