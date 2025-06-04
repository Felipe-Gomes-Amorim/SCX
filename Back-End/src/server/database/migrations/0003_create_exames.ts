import type { Knex } from "knex";
import { ETablenames } from "../ETablenames";


export async function up(knex: Knex) {
    return knex.schema.createTable(ETablenames.exames, table =>{
        table.bigIncrements('id').primary().index();
        table.string('tipo').notNullable().checkLength('>=',5);  //  campo de select para sellecionar os exames no front end (exame de sangue, ultrassom, radiografia)
        table.string('resultado'); // campo de representação de um resultado devolvido pelo laboratorio(vai ser alterado para a implementação real)
        table.string('nome_paciente').notNullable();
        table.string('nome_medico').notNullable();
        table.string('status').defaultTo('pendente');
        table.bigInteger('crm_med').index().notNullable().references('crm').inTable(ETablenames.medico).onUpdate('CASCADE').onDelete('RESTRICT');
        table.bigInteger('cpf_paciente').index().notNullable().references('cpf').inTable(ETablenames.paciente).onUpdate('CASCADE').onDelete('RESTRICT');
        

        table.comment('tabela usada para armazenar as pessoas');

    })
    .then(() => {
        console.log(`# Create table ${ETablenames.exames}`)
    });
    
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablenames.exames).then(() => {
        console.log(`# Drop table ${ETablenames.exames}`)
    })
}
