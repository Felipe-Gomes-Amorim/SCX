import { ETablenames } from "../../ETablenames";
import { IAdm } from "../../models";
import { Knex } from "../../Knex";

export const getByEmail = async (email: string): Promise<IAdm | Error> => {
    try {
        const result = await Knex(ETablenames.adm).select('*').where('email', '=', email).first();

        if (result) return result;
        return new Error ('Registro não encontrado ');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro')
    }
}