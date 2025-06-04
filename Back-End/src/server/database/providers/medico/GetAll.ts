import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IMedico } from "../../models";



export const getAll = async (page: number, limit: number, filter: string): Promise<IMedico[] | Error> => {
    
     
    try {
       
        const result = await Knex(ETablenames.medico).select('*').where('nome', 'like', `%${filter}%`).offset((page -1) * limit).limit(limit);
        
        return result;
        
    } catch (error) {
         
        console.log(error)
        return new Error('Erro ao consultar os registros')
        
    }
};

