import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IPaciente } from "../../models";





export const getByCPF = async (cpf: number): Promise<IPaciente | Error> => {
    
    
    try {
        
        const result = await Knex(ETablenames.paciente).select('nome').where('cpf', '=', cpf).first();

        if (result) return result;
        
        return new Error('Registro não encontrado');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
};