import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { ISecretaria } from "../../models";





export const getById = async (id: number): Promise<ISecretaria | Error> => {
    try {
        const result = await Knex(ETablenames.secretaria).select('*').where('id', '=', id).first();

        if (result) return result;
        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
};