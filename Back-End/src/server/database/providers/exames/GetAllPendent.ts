import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IExames, IPaciente } from "../../models";



export const getAllPendent = async ( status: string): Promise<IExames[] | Error> => {
    
     
    try {
       
        const result = await Knex(ETablenames.exames).select('*').where('status', '=', status);
        
        return result;
        
    } catch (error) {
         
        console.log(error)
        return new Error('Erro ao consultar os registros')
        
    }
};