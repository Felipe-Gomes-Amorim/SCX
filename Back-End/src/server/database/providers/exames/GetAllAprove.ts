import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IExames } from "../../models";





export const getAllAprove = async (status: string): Promise<IExames | Error> => {
    
    
    try {
        
        const result = await Knex(ETablenames.exames).select('*').where('status', '=', status).first();

        if (result) return result;
        
        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
};