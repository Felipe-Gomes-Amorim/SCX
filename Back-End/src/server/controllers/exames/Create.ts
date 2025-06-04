import {Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';
import { IExames, ILogs } from '../../database/models';
import { ExamesProvider } from '../../database/providers/exames';
import { LogsProvider } from '../../database/providers/logs';


interface IBodyProps extends Omit<IExames, 'id'>{}


export const createValidation = validation((getSchema) =>({
    
    body: getSchema<IBodyProps>(yup.object().shape({
        tipo: yup.string().required(),
        resultado: yup.string().optional(),
        nome_paciente: yup.string().required(),
        nome_medico: yup.string().required(),
        cpf_paciente: yup.number().required(),
        crm_med: yup.number().required(),
        status: yup.string().optional()
    }))
}));

export const create = async (req:Request<{}, {}, IExames>, res:Response) => {

    const raw = req.headers.idUsuario;
        const trans = typeof raw === 'string'
            ? parseInt(raw)
            : Array.isArray(raw)
                ? parseInt(raw[0])
                : NaN;
        const role = req.headers.ROLEUsuario
    
        interface IBodyProps extends Omit<ILogs, 'id'> { }

    const result = await ExamesProvider.create(req.body);
    if (result instanceof Error) {

        const logsData: IBodyProps = {
                    usuario: `Tipo do Usuario:${role}, ID:${trans}`,
                    acao: 'tentou cadastrar um exame',
                    detalhes: 'não autorizado',
                    data_hora: new Date().toLocaleString(), 
                }
                LogsProvider.create(logsData)
                
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    } else if (req.headers.ROLEUsuario !== 'secretaria'){

        const logsData: IBodyProps = {
                    usuario: `Tipo do Usuario:${role}, ID:${trans}`,
                    acao: 'tentou cadastrar um exame',
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
                    acao: 'tentou cadastrar um exame',
                    detalhes: 'exame cadastrado',
                    data_hora: new Date().toLocaleString(), 
                }
                LogsProvider.create(logsData)
    




    return res.status(StatusCodes.CREATED).json(result);
};