import type { Knex } from "knex";
import { ETablenames } from "../ETablenames";


export async function up(knex: Knex) {
    return knex.schema.createTable(ETablenames.cidade, table =>{
        table.bigIncrements('id').primary().index();
        table.string('nome', 150).checkLength('<=', 150).index().notNullable();

        table.comment('tabela usada para armazenar as ciidades');

    })
    .then(() => {
        console.log(`# Create table ${ETablenames.cidade}`)
    });
    
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablenames.cidade).then(() => {
        console.log(`# Drop table ${ETablenames.cidade}`)
    })
}
