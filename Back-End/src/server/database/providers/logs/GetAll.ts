import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { ILogs } from "../../models";



export const getAll = async (page: number, limit: number, filter: string): Promise<ILogs[] | Error> => {
    
     
    try {
       
        const result = await Knex(ETablenames.logs).select('*').where('usuario', 'like', `%${filter}%`).offset((page -1) * limit).limit(limit);
        
        return result;
            
    } catch (error) {
         
        console.log(error)
        return new Error('Erro ao consultar os registros')
        
    }
};