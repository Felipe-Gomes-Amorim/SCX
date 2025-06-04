import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IEndereco } from "../../models";



export const updateById = async (id: number, endereco: Omit<IEndereco, 'id'>): Promise<void | Error> => {
    try {
        const [{count}] = await Knex(ETablenames.cidade).where('id', '=', endereco.id_cidade).count<[{count: number}]>('* as count');
        const [{count2}] = await Knex(ETablenames.paciente).where('id', '=', endereco.id_pac).count<[{count2: number}]>('* as count');
    if (count === 0){
        return new Error('A cidade usada no cadastro não foi encontrada');
    } else if(count2 === 0){
        return new Error('o paciente usada no cadastro não foi encontrada');
    }
    const result = await Knex(ETablenames.endereco).update(endereco).where('id', '=', id);

    if(result > 0) return;

    return new Error('Erro ao atualizar registro');
        
    } catch (error) {
        console.log(error);
        return new Error('Error ao atualizar registro');
        
    }
};