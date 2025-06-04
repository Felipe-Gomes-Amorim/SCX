"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const ETablenames_1 = require("../ETablenames");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable(ETablenames_1.ETablenames.endereco, table => {
            table.bigIncrements('id').primary().index();
            table.string('rua').index().notNullable().checkLength('>=', 5);
            table.integer('numero').notNullable();
            table.string('estado').notNullable().checkLength('>=', 2);
            table.string('complemento').notNullable();
            table.integer('cep').notNullable().checkLength('>=', 8);
            table.bigInteger('id_cidade').index().notNullable().references('id').inTable(ETablenames_1.ETablenames.cidade).onUpdate('CASCADE').onDelete('RESTRICT');
            table.bigInteger('id_pac').index().notNullable().references('id').inTable(ETablenames_1.ETablenames.paciente).onUpdate('CASCADE').onDelete('RESTRICT');
            table.comment('tabela usada para armazenar as pessoas');
        })
            .then(() => {
            console.log(`# Create table ${ETablenames_1.ETablenames.endereco}`);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable(ETablenames_1.ETablenames.endereco).then(() => {
            console.log(`# Drop table ${ETablenames_1.ETablenames.endereco}`);
        });
    });
}
exports.down = down;
