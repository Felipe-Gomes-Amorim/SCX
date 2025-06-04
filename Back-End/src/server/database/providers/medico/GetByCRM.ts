import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IMedico } from "../../models";





export const getByCRM = async (crm: number): Promise<IMedico | Error> => {
    
    
    try {
        
        const result = await Knex(ETablenames.medico).select('nome').where('crm', '=', crm).first();

        if (result) return result;
        
        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
};