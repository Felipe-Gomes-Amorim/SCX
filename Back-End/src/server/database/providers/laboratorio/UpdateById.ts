import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { ILaboratorio } from "../../models";



export const updateById = async (id: number, laboratorio: Omit<ILaboratorio, 'id'>): Promise<void | Error> => {
    try {
        

    
    const result = await Knex(ETablenames.laboratorio).update(laboratorio).where('id', '=', id);

    if(result > 0) return;

    return new Error('Erro ao atualizar registro');
        
    } catch (error) {
        console.log(error);
        return new Error('Error ao atualizar registro');
        
    }
};