import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/';
import { IExames, ILogs } from '../../database/models';
import { ExamesProvider } from '../../database/providers/exames';
import { LogsProvider } from '../../database/providers/logs';

interface IparamProps {
    id?: number;
}
interface IBodyProps extends Omit<IExames, 'id'> { }

export const updateByIdValidation = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        tipo: yup.string().required(),
        resultado: yup.string().required(),
        nome_paciente: yup.string().required(),
        nome_medico: yup.string().required(),
        cpf_paciente: yup.number().required(),
        crm_med: yup.number().required(),
        status: yup.string()
    })),
    params: getSchema<IparamProps>(yup.object().shape({
        id: yup.number().required().min(3).moreThan(0),
    })),
}));

export const updateById = async (req: Request<IparamProps, {}, IBodyProps>, res: Response) => {

    const raw = req.headers.CpfUsuario;
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
            acao: 'tentou atualizar o exame',
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }
        LogsProvider.create(logsData)

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'o parametro "id" precisa ser informado'
            }
        })
    }

    const result = await ExamesProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou atualizar o exame',
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }
        LogsProvider.create(logsData)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    } else if (req.headers.ROLEUsuario !== 'laboratorio') {

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou atualizar o exame',
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
        acao: 'tentou atualizar o exame',
        detalhes: 'exame atualizado',
        data_hora: new Date().toLocaleString(),
    }
    LogsProvider.create(logsData)

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
