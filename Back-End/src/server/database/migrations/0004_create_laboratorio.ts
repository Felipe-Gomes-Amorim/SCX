import type { Knex } from "knex";
import { ETablenames } from "../ETablenames";


export async function up(knex: Knex) {
    return knex.schema.createTable(ETablenames.laboratorio, table =>{
        table.bigIncrements('id').primary().index();
        table.string('espec').index().notNullable();
        table.string('nome').notNullable();
        table.string('role').defaultTo('laboratorio')
        table.string('senha').notNullable();
        table.string('email').index().notNullable().unique();
        

        table.comment('tabela usada para armazenar as usuarios');

    })
    .then(() => {
        console.log(`# Create table ${ETablenames.laboratorio}`)
    });
    
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablenames.laboratorio).then(() => {
        console.log(`# Drop table ${ETablenames.laboratorio}`)
    })
}
