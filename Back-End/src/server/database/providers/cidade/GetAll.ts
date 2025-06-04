import { ETablenames } from "../../ETablenames";
import { ICidade } from "../../models";
import { Knex } from "../../Knex";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {
    try{
        
        const result = await Knex(ETablenames.cidade).select('*').where('id', Number(id)).orWhere('nome', 'like', `%${filter}%`).offset((page -1) * limit).limit(limit);

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETablenames.cidade).select('*').where('id', '=', id).first();
            

            if (resultById) return [...result, resultById];
            
        }
        
        return result;
    } catch (error) {
        console.log(error);
        return new Error('erro ao consultar registros')
    }
}