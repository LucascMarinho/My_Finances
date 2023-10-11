import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";

export const updateById = async (
  id: number,
  user: Omit<IUser, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.user).where("id", id).update(user);
    if (result) return;
    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
