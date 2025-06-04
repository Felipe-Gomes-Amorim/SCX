import { PasswordCrypto } from "../../../shared/middlewares/services";
import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IPaciente} from "../../models";



export const create = async (paciente: Omit<IPaciente, 'id'>): Promise<number | Error> =>{
    
    try{
        
        const hashedPassword = await PasswordCrypto.hashPassword(paciente.senha);
        
        const [result] = await Knex(ETablenames.paciente).insert({...paciente, senha: hashedPassword}).returning('id');


        if(typeof result === 'object' ){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        return new Error('erro ao cadstrar registro');
    } catch (error){

        return new Error('Erro ao cadastrar o registro' + error)
    }


   
};