import {Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';
import { IAdm } from '../../database/models';
import { AdmProvider } from '../../database/providers/adm';
import { STATUS_CODES } from 'http';
import { JWTService, PasswordCrypto } from '../../shared/middlewares/services';


interface IBodyProps extends Omit<IAdm, 'id' | 'nome'  | 'role' >{}


export const signInValidation = validation((getSchema) =>({
    
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(6),
        senha: yup.string().required().min(6),
    
    }))
}));


export const signIn = async (req:Request<{}, {}, IBodyProps>, res:Response) => {


    const {email, senha} = req.body;


    const adm = await AdmProvider.getByEmail(email);
    if (adm instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha invalidos'
            }
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(senha, adm.senha)
    if(!passwordMatch){

        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha invalidos'
            }
        });

    } else{


        const accessToken = JWTService.sign({uid: adm.id, role: adm.role, nome:adm.nome});
        if(accessToken === 'JWT_SECRET_NOT_FOUND'){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'erro ao gerar o token de acesso'
                }
            })

        }
        const nome = adm.nome
        const role = adm.role
        return res.status(StatusCodes.OK).json({accessToken,nome, role})
    }
    

    
 
    

    
};
