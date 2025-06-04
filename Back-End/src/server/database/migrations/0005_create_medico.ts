import type { Knex } from "knex";
import { ETablenames } from "../ETablenames";


export async function up(knex: Knex) {
    return knex.schema.createTable(ETablenames.medico, table =>{
        table.bigIncrements('id').primary().index();
        table.integer('crm').notNullable().unique();
        table.string('nome').notNullable();
        table.string('email').notNullable().unique();
        table.string('senha').notNullable().checkLength('>=', 6);
        table.string('uf_crm').notNullable();
        table.string('espec').notNullable();
        table.string('role').defaultTo('medico')
       
        

        table.comment('tabela usada para armazenar as usuarios');

    })
    .then(() => {
        console.log(`# Create table ${ETablenames.medico}`)
    });
    
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablenames.medico).then(() => {
        console.log(`# Drop table ${ETablenames.medico}`)
    })
}
