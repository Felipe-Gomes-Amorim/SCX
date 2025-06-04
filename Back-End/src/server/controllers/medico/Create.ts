import {Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';
import { ILogs, IMedico } from '../../database/models';
import { MedicoProvider } from '../../database/providers/medico';
import { LogsProvider } from '../../database/providers/logs';


interface IBodyProps extends Omit<IMedico, 'id'>{}

export const createValidation = validation((getSchema) =>({
    
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        senha: yup.string().required().min(5),
        espec: yup.string().required().min(5),
        role: yup.string().optional(),
        crm: yup.number().required(),
        email: yup.string().required(),
        uf_crm: yup.string().required()
    
    }))
}));

export const create = async (req:Request<{}, {}, IMedico>, res:Response) => {

     const raw = req.headers.idUsuario;
        const trans = typeof raw === 'string'
            ? parseInt(raw)
            : Array.isArray(raw)
                ? parseInt(raw[0])
                : NaN;
        const role = req.headers.ROLEUsuario
    
        interface IBodyProps extends Omit<ILogs, 'id'> {}
        

    const result = await MedicoProvider.create(req.body);
    if (result instanceof Error) {

        const logsData: IBodyProps = {
                    usuario: `Tipo do Usuario:${role}, ID:${trans}`,
                    acao: 'tentou cadastrar um medico',
                    detalhes: 'falha no cadastro',
                    data_hora: new Date().toLocaleString(), 
                }
                LogsProvider.create(logsData)
                
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    } else if (req.headers.ROLEUsuario !== 'adm'){

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou cadastrar um medico',
            detalhes: 'não autorizado',
            data_hora: new Date().toLocaleString(), 
        }
        LogsProvider.create(logsData)

        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'voce não está autorizado'
            }
        });

    }

    const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou cadastrar um medico',
            detalhes: 'cadastro realizado',
            data_hora: new Date().toLocaleString(), 
        }
        LogsProvider.create(logsData)


    return res.status(StatusCodes.CREATED).json(result);
};