import * as count from "./count";
import * as create from "./create";
import * as getAll from "./getAll";
import * as getById from "./getById";
import * as getByUserId from "./getByUserId";
import * as updateByIdById from "./updateById";
import * as deleteByIdById from "./deleteById";

export const TransactionsProvider = {
  ...count,
  ...create,
  ...getAll,
  ...getById,
  ...getByUserId,
  ...updateByIdById,
  ...deleteByIdById,
};
