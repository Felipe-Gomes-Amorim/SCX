import { Knex } from "knex";
import { ETablenames } from "../ETablenames";

export const seed = async (knex: Knex) => {

    const [{count}] = await knex(ETablenames.cidade).count<[{count: number}]>('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;

    const cidadesToInsert = cidadesTeste.map(nomeDaCidade => ({nome: nomeDaCidade}));
    await knex(ETablenames.cidade).insert(cidadesToInsert);
}

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
]