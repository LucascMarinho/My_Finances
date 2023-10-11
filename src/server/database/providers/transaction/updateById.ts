import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ITransaction } from "../../models";

export const updateById = async (
  id: number,
  transaction: Omit<ITransaction, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.transaction)
      .where("id", id)
      .update(transaction);
    if (result) return;
    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
