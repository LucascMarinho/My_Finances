import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateByIdById from "./UpdateById";
import * as deleteByIdById from "./DeleteById";

export const UserController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateByIdById,
  ...deleteByIdById,
};
