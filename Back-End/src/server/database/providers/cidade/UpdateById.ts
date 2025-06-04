import { ETablenames } from "../../ETablenames";
import { ICidade } from "../../models";
import { Knex } from "../../Knex";

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETablenames.cidade).update(cidade).where('id', '=', id);

        if (result > 0) return;
        return new Error('Erro ao atualizar registro');
        
    } catch (error) {
        console.log(error)
        return new Error('erro ao atualizar registro');
        
    }
}