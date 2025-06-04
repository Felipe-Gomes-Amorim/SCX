import { query, Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { CidadesProvider } from '../../database/providers/cidade';
import { ExamesProvider } from '../../database/providers/exames';
import { ILogs } from '../../database/models';
import { LogsProvider } from '../../database/providers/logs';


interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({

    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        id: yup.number().integer().optional().default(0),
        filter: yup.string().optional()


    })),
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

    const raw = req.headers.idUsuario;
    const trans = typeof raw === 'string'
        ? parseInt(raw)
        : Array.isArray(raw)
            ? parseInt(raw[0])
            : NaN;
    const role = req.headers.ROLEUsuario

    interface IBodyProps extends Omit<ILogs, 'id'> { }


    const result = await ExamesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '',);
    const count = await ExamesProvider.count(req.query.filter);

    if (result instanceof Error) {

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou listar todos os exames',
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }
        LogsProvider.create(logsData)

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    } else if (count instanceof Error) {
        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou listar todos os exames',
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }
        LogsProvider.create(logsData)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        })
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);


    const logsData: IBodyProps = {
        usuario: `Tipo do Usuario:${role}, ID:${trans}`,
        acao: 'tentou listar todos os exames',
        detalhes: 'listagem feita',
        data_hora: new Date().toLocaleString(),
    }
    LogsProvider.create(logsData)



    return res.status(StatusCodes.OK).json(result);
};