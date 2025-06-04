import type { Knex } from "knex";
import { ETablenames } from "../ETablenames";


export async function up(knex: Knex) {
    return knex.schema.createTable(ETablenames.paciente, table =>{
        table.bigIncrements('id').primary().index();
        table.string('nome').notNullable().index();
        table.string('senha').notNullable();
        table.string('instituicao_vinc');
        table.bigInteger('cpf').notNullable().unique().index()
        table.string('email').notNullable().unique().index()
        table.string('role').defaultTo('paciente')
       
        

        table.comment('tabela usada para armazenar as usuarios');

    })
    .then(() => {
        console.log(`# Create table ${ETablenames.paciente}`)
    });
    
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablenames.paciente).then(() => {
        console.log(`# Drop table ${ETablenames.paciente}`)
    })
}
