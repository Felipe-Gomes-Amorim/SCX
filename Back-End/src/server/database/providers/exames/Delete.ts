import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";




export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETablenames.exames).where('id', '=', id).del();

        if (result > 0) return;

        return new Error('Erro ao apagar registro');
         
    } catch (error) {
        console.log(error);
        return new Error ('Erro ao apagar registro');
    }
};