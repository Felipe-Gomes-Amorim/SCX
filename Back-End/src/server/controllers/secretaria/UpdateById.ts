import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/';
import { ILogs, ISecretaria } from '../../database/models';
import { SecretariaProvider } from '../../database/providers/secretaria';
import { LogsProvider } from '../../database/providers/logs';

interface IparamProps {
    id?: number;
}
interface IBodyProps extends Omit<ISecretaria, 'id'> { }

export const updateByIdValidation = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        senha: yup.string().required().min(5),
        role: yup.string().optional(),
        email: yup.string().required()


    })),

    params: getSchema<IparamProps>(yup.object().shape({
        id: yup.number().required().min(3).moreThan(0),
    })),
}));

export const updateById = async (req: Request<IparamProps, {}, IBodyProps>, res: Response) => {

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
            acao: 'tentou logar',
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

    const result = await SecretariaProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou logar',
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


    const logsData: IBodyProps = {
        usuario: `Tipo do Usuario:${role}, ID:${trans}`,
        acao: 'tentou atualizar um registro de funcionario',
        detalhes: 'usuario atualizado',
        data_hora: new Date().toLocaleString(),
    }
    LogsProvider.create(logsData)

    

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
