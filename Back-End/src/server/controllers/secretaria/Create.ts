import { Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { ILogs, ISecretaria } from '../../database/models';
import { SecretariaProvider } from '../../database/providers/secretaria';
import { LogsProvider } from '../../database/providers/logs';
import nodemailer from 'nodemailer';


interface IBodyProps extends Omit<ISecretaria, 'id'> { }


export const createValidation = validation((getSchema) => ({

    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        senha: yup.string().required().min(5),
        role: yup.string().optional(),
        email: yup.string().required()

    }))
}));


export const create = async (req: Request<{}, {}, ISecretaria>, res: Response) => {
     const senha = req.headers.SenhaUsuario

    const raw = req.headers.idUsuario;
    const trans = typeof raw === 'string'
        ? parseInt(raw)
        : Array.isArray(raw)
            ? parseInt(raw[0])
            : NaN;
    const role = req.headers.ROLEUsuario

    interface IBodyProps extends Omit<ILogs, 'id'> { }

    const result = await SecretariaProvider.create(req.body);

    if (result instanceof Error) {

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou cadastrar um funcionario',
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
        acao: 'tentou cadastrar um funcionario',
        detalhes: 'cadastrado com sucesso',
        data_hora: new Date().toLocaleString(),
    }
    LogsProvider.create(logsData)











   



    return res.status(StatusCodes.CREATED).json(result);
};



