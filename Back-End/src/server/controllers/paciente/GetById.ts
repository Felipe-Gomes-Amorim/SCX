import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { PacienteProvider } from "../../database/providers/paciente";
import { ILogs } from "../../database/models";
import { LogsProvider } from "../../database/providers/logs";

interface IparamProps {
    id?: number;
}
export const getByIdValidation = validation(getSchema => ({
    params: getSchema<IparamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const getById = async (req: Request<IparamProps>, res: Response) => {

    const raw = req.headers.idUsuario;
        const trans = typeof raw === 'string'
        ? parseInt(raw)
        : Array.isArray(raw)
        ? parseInt(raw[0])
        : NaN;
        const role = req.headers.ROLEUsuario
    
        interface IBodyProps extends Omit<ILogs, 'id'>{}

   if (!req.params.id) {
    
    const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: `Solicitou um registro de um usuario especifíco`,
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }

        LogsProvider.create(logsData)

    return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
            default: 'o parametro id precisa ser informado'
        }
    });
   }

   const result = await PacienteProvider.getById(req.params.id);
   if (result instanceof Error) {

    const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: `Solicitou um registro de um usuario especifíco`,
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }

        LogsProvider.create(logsData)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });
   }else if (req.headers.ROLEUsuario !== 'secretaria' && req.headers.ROLEUsuario !== 'paciente'){

    const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: `Solicitou um registro de um usuario especifíco`,
            detalhes: 'acesso negado',
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
            acao: `Solicitou um registro de um usuario especifíco`,
            detalhes: 'Registro acessado',
            data_hora: new Date().toLocaleString(),
        }
        LogsProvider.create(logsData)

   return res.status(StatusCodes.OK).json(result);
};