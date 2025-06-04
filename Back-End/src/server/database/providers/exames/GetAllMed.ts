import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IExames, IPaciente } from "../../models";



export const getAllMed = async ( id: number): Promise<IExames[] | Error> => {
    
     
    try {
       
        const result = await Knex(ETablenames.exames).select('*').where('id_medico', '=', id);
        
        return result;
        
    } catch (error) {
         
        console.log(error)
        return new Error('Erro ao consultar os registros')
        
    }
};

