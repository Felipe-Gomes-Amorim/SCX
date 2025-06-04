import { PasswordCrypto } from "../../../shared/middlewares/services";
import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { ILogs} from "../../models";



export const create = async (logs: Omit<ILogs, 'id'>): Promise<number | Error> =>{

    try{
        
        
        const [result] = await Knex(ETablenames.logs).insert(logs).returning('id'); 


        if(typeof result === 'object' ){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        return new Error('erro ao cadstrar registro');
    } catch (error){
        console.log("📥 Dados recebidos para log:", logs);

        return new Error('Erro ao cadastrar o registro')
    }


   
};