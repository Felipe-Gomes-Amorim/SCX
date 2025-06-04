import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IExames } from "../../models";



export const create = async (exames: Omit<IExames, 'id'>): Promise<number | Error> => {
    try {
        const [{count}] = await Knex(ETablenames.paciente).where('cpf', '=', exames.cpf_paciente).count<[{count: number}]>('* as count');
        const [{count2}] = await Knex(ETablenames.medico).where('crm', '=', exames.crm_med).count<[{count2: number}]>('* as count');
    
    if (count === 0){
        return new Error('O paciente usado no cadastro não foi encontrada');
    } else if(count2 === 0) return new Error('o medico não foi encontrado');

    const [result] = await Knex(ETablenames.exames).insert(exames).returning('id');
    if (typeof result === 'object') {
        return result.id;
    } else if (typeof result === 'number') {
        return result;
    }

    return new Error('Erro ao cadastrar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro')

        
    }
}