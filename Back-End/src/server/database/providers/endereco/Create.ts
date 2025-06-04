import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IEndereco } from "../../models";



export const create = async (endereco: Omit<IEndereco, 'id'>): Promise<number | Error> => {
    try {
        const [{count}] = await Knex(ETablenames.cidade).where('id', '=', endereco.id_cidade).count<[{count: number}]>('* as count');
        const [{count2}] = await Knex(ETablenames.paciente).where('id', '=', endereco.id_pac).count<[{count2: number}]>('* as count');
    if (count === 0){
        return new Error('A cidade usada no cadastro não foi encontrada');
    } else if(count2 === 0){
        return new Error('o paciente usada no cadastro não foi encontrada');
    }

    const [result] = await Knex(ETablenames.endereco).insert(endereco).returning('id');
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