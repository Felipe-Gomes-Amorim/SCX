import type { Knex } from "knex";
import { ETablenames } from "../ETablenames";


export async function up(knex: Knex) {
    
    return knex.schema.createTable(ETablenames.secretaria, table =>{
        table.bigIncrements('id').primary().index();
        table.string('nome').notNullable().checkLength('>=',3);
        table.string('email').unique().index().notNullable().checkLength('>=', 5);
        table.string('senha').notNullable().checkLength('>=', 6);
        table.string('role').defaultTo('secretaria');

        table.comment('tabela usada para armazenar as usuarios');

    })
    .then(() => {
        console.log(`# Create table ${ETablenames.secretaria}`)
    });
    
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablenames.secretaria).then(() => {
        console.log(`# Drop table ${ETablenames.secretaria}`)
    })
}
