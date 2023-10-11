import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";

export const getById = async (id: number): Promise<IUser | Error> => {
  try {
    const result = await Knex(ETableNames.user)
      .select("*")
      .where("id", id)
      .first();
    if (result) {
      return result;
    }
    console.log(result);
    return new Error("Erro ao atualizar o registro.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
