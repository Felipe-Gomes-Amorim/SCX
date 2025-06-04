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
        return knex.schema.createTable(ETablenames_1.ETablenames.medico, table => {
            table.bigIncrements('id').primary().index();
            table.integer('crm').notNullable();
            table.string('nome').index().notNullable();
            table.string('email').notNullable().unique();
            table.string('senha').notNullable().checkLength('>=', 6);
            table.string('uf_crm').notNullable();
            table.string('espec').notNullable();
            table.string('role').defaultTo('medico');
            table.comment('tabela usada para armazenar as usuarios');
        })
            .then(() => {
            console.log(`# Create table ${ETablenames_1.ETablenames.medico}`);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable(ETablenames_1.ETablenames.medico).then(() => {
            console.log(`# Drop table ${ETablenames_1.ETablenames.medico}`);
        });
    });
}
exports.down = down;
