import {Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';
import { ILogs, IMedico } from '../../database/models';
import { MedicoProvider } from '../../database/providers/medico';
import { STATUS_CODES } from 'http';
import { JWTService, PasswordCrypto } from '../../shared/middlewares/services';
import { LogsProvider } from '../../database/providers/logs';


interface IBodyProps extends Omit<IMedico, 'id' | 'nome' | 'role'| 'crm' | 'uf_crm' | 'espec'>{}


export const signInValidation = validation((getSchema) =>({
    
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(6),
        senha: yup.string().required().min(6),
    
    }))
}));


export const signIn = async (req:Request<{}, {}, IBodyProps>, res:Response) => {

     const raw = req.headers.idUsuario;
        const trans = typeof raw === 'string'
            ? parseInt(raw)
            : Array.isArray(raw)
                ? parseInt(raw[0])
                : NaN;
        const role = req.headers.ROLEUsuario
    
        interface IBodyProps extends Omit<ILogs, 'id'> { }


    const {email, senha} = req.body;


    const medico = await MedicoProvider.getByEmail(email);
    if (medico instanceof Error) {

        const logsData: IBodyProps = {
                        usuario: `indefinido`,
                        acao: 'tentou logar como medico',
                        detalhes: 'erro interno',
                        data_hora: new Date().toLocaleString(),
                    }
                    LogsProvider.create(logsData)
                    
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha invalidos'
            }
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(senha, medico.senha)
    if(!passwordMatch){

        const logsData: IBodyProps = {
            usuario: `Nome do Usuario:${medico.nome}`,
            acao: `tentou logar `,
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }

        LogsProvider.create(logsData)

        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha invalidos'
            }
        });

    } else{
        



        const accessToken = JWTService.sign({uid: medico.id, role: medico.role});
        if(accessToken === 'JWT_SECRET_NOT_FOUND'){
            const logsData: IBodyProps = {
            usuario: `Nome do Usuario:${medico.nome}`,
            acao: `tentou logar `,
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }

        LogsProvider.create(logsData)

            
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'erro ao gerar o token de acesso'
                }
            })

        }

        const logsData: IBodyProps = {
            usuario: `Nome do Usuario:${medico.nome}`,
            acao: `tentou logar `,
            detalhes: 'cadastro realizado',
            data_hora: new Date().toLocaleString(),
        }

        LogsProvider.create(logsData)
        return res.status(StatusCodes.OK).json({accessToken})
    }
    

    
 
    

    
};
