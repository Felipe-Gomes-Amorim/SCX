import { PasswordCrypto } from "../../../shared/middlewares/services";
import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IMedico} from "../../models";



export const create = async (medico: Omit<IMedico, 'id'>): Promise<number | Error> =>{
 
    try{
        const hashedPassword = await PasswordCrypto.hashPassword(medico.senha);
                
        const [result] = await Knex(ETablenames.medico).insert({...medico, senha: hashedPassword}).returning('id');
        
       
   

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