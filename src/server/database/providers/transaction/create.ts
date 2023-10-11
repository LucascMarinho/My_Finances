import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ITransaction } from "../../models";

export const create = async (
  transaction: Omit<ITransaction, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.transaction)
      .insert(transaction)
      .returning("id");
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return new Error("Erro ao realizar o registro.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao realizar o registro");
  }
};
