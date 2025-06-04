import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IExames, IPaciente } from "../../models";



export const getAllPac = async ( cpf: number): Promise<IExames[] | Error> => {
    
    
     
    try {
       
        const result = await Knex(ETablenames.exames).select('*').where('cpf_paciente', '=', cpf);
        console.log(cpf)
        return result;
        
    } catch (error) {
         
        console.log(error)
        return new Error('Erro ao consultar os registros')
        
    }
};

