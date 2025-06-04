
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { ExamesProvider } from "../../database/providers/exames";
import { ILogs } from "../../database/models";
import { LogsProvider } from "../../database/providers/logs";

interface IparamProps {
    id?: number;
}

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}
export const getAllMedValidation = validation(getSchema => ({
    params: getSchema<IparamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        id: yup.number().integer().optional().default(0),
        filter: yup.string().optional()


    }))
}));

export const getAllMed = async (req: Request<IQueryProps, {}, {}, IQueryProps>, res: Response) => {

    const raw = req.headers.idUsuario;
    const trans = typeof raw === 'string'
        ? parseInt(raw)
        : Array.isArray(raw)
            ? parseInt(raw[0])
            : NaN;
    const role = req.headers.ROLEUsuario

    interface IBodyProps extends Omit<ILogs, 'id'> { }

    if (!req.params.id) {

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou listar todos os exames ligados a esse ususario',
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


    const result = await ExamesProvider.getAllMed(req.params.id);
    const count = await ExamesProvider.count(req.query.filter);
    if (result instanceof Error) {

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou listar todos os exames ligados a esse usuario',
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }
        LogsProvider.create(logsData)

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    else if (req.headers.ROLEUsuario !== 'medico') {

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou listar todos os exames ligados a esse usuario',
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
        acao: 'tentou listar todos os exames ligados a esse usuario',
        detalhes: 'listagem realizada',
        data_hora: new Date().toLocaleString(),
    }
    LogsProvider.create(logsData)

    return res.status(StatusCodes.OK).json(result);
};