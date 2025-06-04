import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { ILaboratorio } from "../../models";



export const getAll = async (page: number, limit: number, filter: string): Promise<ILaboratorio[] | Error> => {
    
     
    try {
       
        const result = await Knex(ETablenames.laboratorio).select('*').where('espec', 'like', `%${filter}%`).offset((page -1) * limit).limit(limit);
        
        return result;
        
    } catch (error) {
         
        console.log(error)
        return new Error('Erro ao consultar os registros')
        
    }
};

