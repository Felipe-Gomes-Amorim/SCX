import { ETablenames } from "../../ETablenames";
import { ISecretaria } from "../../models";
import { Knex } from "../../Knex";

export const getByEmail = async (email: string): Promise<ISecretaria | Error> => {
    try {
        const result = await Knex(ETablenames.secretaria).select('*').where('email', '=', email).first();

        if (result) return result;
        return new Error ('Registro não encontrado ');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro')
    }
}