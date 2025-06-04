import { ETablenames } from "../../ETablenames";
import { ICidade } from "../../models";
import { Knex } from "../../Knex";

export const getById = async (id: number): Promise<ICidade | Error> => {
    try {
        const result = await Knex(ETablenames.cidade).select('*').where('id', '=', id).first();

        if (result) return result;
        return new Error ('Registro não encontrado ');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro')
    }
}