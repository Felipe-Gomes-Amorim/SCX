import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";

export const Delete = async (id: number): Promise<void | Error> => {
    try{
        const result = await Knex(ETablenames.cidade).where('id', '=', id).del();
        if (result > 0) return;

        return new Error('Erro ao apagar o registro');

    } catch (error) {
        console.log(error);
        return new Error ('Erro ao apgar registro'); 

    }
};