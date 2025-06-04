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
const services_1 = require("../../../shared/middlewares/services");
const ETablenames_1 = require("../../ETablenames");
const Knex_1 = require("../../Knex");
const create = (laboratorio) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield services_1.PasswordCrypto.hashPassword(laboratorio.senha);
        const [result] = yield (0, Knex_1.Knex)(ETablenames_1.ETablenames.laboratorio).insert(Object.assign(Object.assign({}, laboratorio), { senha: hashedPassword })).returning('id');
        if (typeof result === 'object') {
            return result.id;
        }
        else if (typeof result === 'number') {
            return result;
        }
        return new Error('erro ao cadstrar registro');
    }
    catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
});
exports.create = create;
