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
exports.seed = void 0;
const ETablenames_1 = require("../ETablenames");
const seed = (knex) => __awaiter(void 0, void 0, void 0, function* () {
    const [{ count }] = yield knex(ETablenames_1.ETablenames.cidade).count('* as count');
    if (!Number.isInteger(count) || Number(count) > 0)
        return;
    const cidadesToInsert = cidadesTeste.map(nomeDaCidade => ({ nome: nomeDaCidade }));
    yield knex(ETablenames_1.ETablenames.cidade).insert(cidadesToInsert);
});
exports.seed = seed;
const cidadesTeste = [
    "big dick one",
    "little dick one",
    "demervopoles",
    "jacarepagua",
    "gogo",
    "fazendas de shimeji",
    "raya lucaria",
    "limgrave",
    "fire link",
    "majula",
    "drangleic",
    "new londo",
    "anor londo",
    "dragon shrine",
    "amana shrine",
    "zamor",
    "aldias keep",
    "fazendas de shimeji"
];
