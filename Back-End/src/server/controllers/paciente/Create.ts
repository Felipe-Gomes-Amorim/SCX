import { Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { ILogs, IPaciente } from '../../database/models';
import { PacienteProvider } from '../../database/providers/paciente';
import { LogsProvider } from '../../database/providers/logs';


interface IBodyProps extends Omit<IPaciente, 'id'> { }




export const createValidation = validation((getSchema) => ({

    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        senha: yup.string().required().min(5),
        instituicao_vinc: yup.string().optional().min(5),
        role: yup.string().optional(),
        cpf: yup.number().required(),
        email: yup.string().required()

    }))
}));


export const create = async (req: Request<{}, {}, IPaciente>, res: Response) => {

    const raw = req.headers.idUsuario;
    const trans = typeof raw === 'string'
        ? parseInt(raw)
        : Array.isArray(raw)
            ? parseInt(raw[0])
            : NaN;
    const role = req.headers.ROLEUsuario

    interface IBodyProps extends Omit<ILogs, 'id'> { }


    console.log(req.body)

    const result = await PacienteProvider.create(req.body);
    if (result instanceof Error) {

        console.log('chegou')

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou cadastrar um paciente',
            detalhes: 'falha no cadastro',
            data_hora: new Date().toLocaleString(), 
        }
        LogsProvider.create(logsData)

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    } else if (req.headers.ROLEUsuario !== 'secretaria') {

        const logsData: IBodyProps = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou cadastrar um paciente',
            detalhes: 'falha no cadastro',
            data_hora: new Date().toLocaleString(),
        }
        LogsProvider.create(logsData)

        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'voce não está autorizado'
            }
        });

    }






    console.log(req.body);



    const logsData: IBodyProps = {
        usuario: `Tipo do Usuario:${role}, ID:${trans}`,
        acao: 'tentou cadastrar um paciente',
        detalhes: 'cadastrado com sucesso',
        data_hora: new Date().toLocaleString(),
    }
    LogsProvider.create(logsData)


    return res.status(StatusCodes.CREATED).json(result);


};