import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.transaction, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("userId").index().notNullable();
      table.string("type").index().notNullable();
      table.float("amount").notNullable();
      table.string("tag").notNullable();
      table.string("description").notNullable();
      table.string("note").nullable();
      table.string("date").index().notNullable();

      table.comment("Table used to store transactions at the system");
    })
    .then(() => console.log(`Created table ${ETableNames.transaction}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.transaction)
    .then(() => console.log(`Dropped table ${ETableNames.transaction}`));
}
