import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IPaciente } from "../../models";



export const getAll = async (page: number, limit: number, filter: string): Promise<IPaciente[] | Error> => {
    
     
    try {
       
        const result = await Knex(ETablenames.paciente).select('*').where('nome', 'like', `%${filter}%`).offset((page -1) * limit).limit(limit);
        
        return result;
        
    } catch (error) {
         
        console.log(error)
        return new Error('Erro ao consultar os registros')
        
    }
};

