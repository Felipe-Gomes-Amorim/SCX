import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares'
import { SecretariaProvider } from '../../database/providers/secretaria';
import { ILogs } from '../../database/models/Logs';
import { LogsProvider } from '../../database/providers/logs';

interface IParamProps {
    id?: number;
}
export const deleteValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {

    const raw = req.headers.idUsuario;
            const trans = typeof raw === 'string'
                ? parseInt(raw)
                : Array.isArray(raw)
                    ? parseInt(raw[0])
                    : NaN;
            const role = req.headers.ROLEUsuario
        
            interface IBodyProps extends Omit<ILogs, 'id'> { }
            

   if(!req.params.id) {
    
    const logsData: IBodyProps = {
                    usuario: `Tipo do Usuario:${role}, ID:${trans}`,
                    acao: 'tentou deletar um funcionario',
                    detalhes: 'erro interno',
                    data_hora: new Date().toLocaleString(),
                }
                LogsProvider.create(logsData)
    
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
            default: 'o parametro "id" precisa ser informado'
        }
    });
   }

   const result = await SecretariaProvider.deleteById(req.params.id);
   if(result instanceof Error) {

    const logsData: IBodyProps = {
                    usuario: `Tipo do Usuario:${role}, ID:${trans}`,
                    acao: 'tentou deletar um funcionarisso',
                    detalhes: 'erro internod',
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
                    acao: 'tentou deletar um funcionario',
                    detalhes: 'não autroizado',
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
                    acao: 'tentou deletar um funcionario',
                    detalhes: 'deletado com sucesso',
                    data_hora: new Date().toLocaleString(),
                }
                LogsProvider.create(logsData)




    return res.status(StatusCodes.NO_CONTENT).send()
}; 
