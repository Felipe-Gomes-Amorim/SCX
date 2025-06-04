import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";

export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const [{count}] = await Knex(ETablenames.cidade).where('nome', 'like', `%${filter}%`).count<[{ count: number}]>('* as count');
        if (Number.isInteger(Number(count))) return Number(count);

        return new Error ('Erro ao consultar quantidade total de registro');
        
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar quantidade total de registro');
        
    }
}