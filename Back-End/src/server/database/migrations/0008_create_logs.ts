import type { Knex } from "knex";
import { ETablenames } from "../ETablenames";


export async function up(knex: Knex) {
    
    return knex.schema.createTable(ETablenames.logs, table =>{
        table.bigIncrements('id').primary().index();
        table.string('usuario').notNullable();
        table.string('acao').notNullable();
        table.string('detalhes').notNullable();
        table.string('data_hora').notNullable();

        table.comment('tabela usada para armazenar as usuarios');

    })
    .then(() => {
        console.log(`# Create table ${ETablenames.logs}`)
    });
    
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablenames.logs).then(() => {
        console.log(`# Drop table ${ETablenames.logs}`)
    })
}
