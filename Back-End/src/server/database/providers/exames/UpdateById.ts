import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IExames } from "../../models";



export const updateById = async (id: number, exames: Omit<IExames, 'id'>): Promise<void | Error> => {
    try {
        const [{count}] = await Knex(ETablenames.paciente).where('cpf', '=', exames.cpf_paciente).count<[{count: number}]>('* as count');
        const [{count2}] = await Knex(ETablenames.medico).where('crm', '=', exames.crm_med).count<[{count2: number}]>('* as count');
    if (count === 0) {
        return new Error('o aboratorio usada no cadastro não foi encontrada');
    } else if(count2 === 0) return new Error('o medico não foi encontrado');
    
    const result = await Knex(ETablenames.exames).update(exames).where('id', '=', id);

    if(result > 0) return;

    return new Error('Erro ao atualizar registro');
        
    } catch (error) {
        console.log(error);
        return new Error('Error ao atualizar registro');
        
    }
};