import { PasswordCrypto } from "../../../shared/middlewares/services";
import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { ILaboratorio} from "../../models";



export const create = async (laboratorio: Omit<ILaboratorio, 'id'>): Promise<number | Error> =>{

    try{
        
        const hashedPassword = await PasswordCrypto.hashPassword(laboratorio.senha);
        
        const [result] = await Knex(ETablenames.laboratorio).insert({...laboratorio, senha: hashedPassword}).returning('id');


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