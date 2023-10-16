import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { UsersProvider } from "../../database/providers/user";
import { TransactionsProvider } from "../../database/providers/transaction";

interface IParamsProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: "Couldn't find 'id' parameter.",
      },
    });
  }

  const userResult = await UsersProvider.getById(req.params.id);
  const transactionResult = await TransactionsProvider.getByUserId(
    req.params.id
  );
  if (userResult instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: userResult.message,
      },
    });
  } else if (transactionResult instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: transactionResult.message,
      },
    });
  }

  return res
    .status(StatusCodes.OK)
    .json(
      transactionResult
        ? { ...userResult, transactions: transactionResult }
        : userResult
    );
};
