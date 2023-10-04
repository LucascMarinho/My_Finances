import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.user, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").index().notNullable();
      table.string("email").index().notNullable();
      table.bigInteger("age").notNullable();

      table.comment("Table used to store users at the system");
    })
    .then(() => console.log(`Created table ${ETableNames.user}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.user)
    .then(() => console.log(`Dropped table ${ETableNames.user}`));
}
