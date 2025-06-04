import { PasswordCrypto } from "../../../shared/middlewares/services";
import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { ISecretaria} from "../../models";



export const create = async (secretaria: Omit<ISecretaria, 'id'>): Promise<number | Error> =>{

    try{
        
        const hashedPassword = await PasswordCrypto.hashPassword(secretaria.senha);
        
        const [result] = await Knex(ETablenames.secretaria).insert({...secretaria, senha: hashedPassword}).returning('id');

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