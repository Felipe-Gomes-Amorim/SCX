import { ETablenames } from "../../ETablenames"
import { Knex } from "../../Knex"


export const count = async (filter = ''): Promise<number | Error> => {

    try {
        const [{count}] = await Knex(ETablenames.exames).where('nome_paciente', 'like', `%${filter}%`).count<[{count: number}]>('* as count');

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Erro ao cosultar a quantidade total de registros');
        
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar aa quantidade total de registros');
        
    }
} 