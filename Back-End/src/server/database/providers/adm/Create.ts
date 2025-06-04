import { PasswordCrypto } from "../../../shared/middlewares/services";
import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IAdm} from "../../models";



export const create = async (adm: Omit<IAdm, 'id'>): Promise<number | Error> =>{

    try{
        
        const hashedPassword = await PasswordCrypto.hashPassword(adm.senha);
        
        const [result] = await Knex(ETablenames.adm).insert({...adm, senha: hashedPassword}).returning('id');

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