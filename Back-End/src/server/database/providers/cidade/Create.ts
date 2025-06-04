import {Knex} from "../../Knex";
import { ICidade } from "../../models";
import { ETablenames } from "../../ETablenames";



export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number | Error> =>{

    try{
        

        const [result] = await Knex(ETablenames.cidade).insert(cidade).returning('id');

        if(typeof result === 'object' ){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        return new Error('erro ao cadstrar registro');
    } catch (error){

        return new Error('Erro ao cadastrar o registro')
    }


   
};