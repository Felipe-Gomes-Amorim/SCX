import type { Knex } from "knex";
import { ETablenames } from "../ETablenames";


export async function up(knex: Knex) {
    return knex.schema.createTable(ETablenames.endereco, table =>{
        table.bigIncrements('id').primary().index();
        table.string('rua', ).index().notNullable().checkLength('>=',5);
        table.integer('numero', ).notNullable();
        table.string('estado', ).notNullable().checkLength('>=',2);
        table.string('complemento', ).notNullable();
        table.integer('cep', ).notNullable().checkLength('>=',8);
        table.bigInteger('id_cidade', ).index().notNullable().references('id').inTable(ETablenames.cidade).onUpdate('CASCADE').onDelete('RESTRICT');
        table.bigInteger('id_pac', ).index().notNullable().references('id').inTable(ETablenames.paciente).onUpdate('CASCADE').onDelete('RESTRICT');

        table.comment('tabela usada para armazenar as pessoas');

    })
    .then(() => {
        console.log(`# Create table ${ETablenames.endereco}`)
    });
    
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablenames.endereco).then(() => {
        console.log(`# Drop table ${ETablenames.endereco}`)
    })
}
