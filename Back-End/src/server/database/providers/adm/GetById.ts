import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IAdm } from "../../models";





export const getById = async (id: number): Promise<IAdm | Error> => {
    try {
        const result = await Knex(ETablenames.adm).select('*').where('id', '=', id).first();

        if (result) return result;
        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
};