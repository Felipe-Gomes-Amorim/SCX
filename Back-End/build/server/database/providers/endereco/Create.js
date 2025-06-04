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
exports.create = void 0;
const ETablenames_1 = require("../../ETablenames");
const Knex_1 = require("../../Knex");
const create = (endereco) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [{ count }] = yield (0, Knex_1.Knex)(ETablenames_1.ETablenames.cidade).where('id', '=', endereco.id_cidade).count('* as count');
        const [{ count2 }] = yield (0, Knex_1.Knex)(ETablenames_1.ETablenames.paciente).where('id', '=', endereco.id_pac).count('* as count');
        if (count === 0) {
            return new Error('A cidade usada no cadastro não foi encontrada');
        }
        else if (count2 === 0) {
            return new Error('o paciente usada no cadastro não foi encontrada');
        }
        const [result] = yield (0, Knex_1.Knex)(ETablenames_1.ETablenames.endereco).insert(endereco).returning('id');
        if (typeof result === 'object') {
            return result.id;
        }
        else if (typeof result === 'number') {
            return result;
        }
        return new Error('Erro ao cadastrar registro');
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
    }
});
exports.create = create;
