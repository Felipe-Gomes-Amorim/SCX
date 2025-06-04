import {Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';
import { ILogs, IPaciente } from '../../database/models';
import { PacienteProvider } from '../../database/providers/paciente';
import { STATUS_CODES } from 'http';
import { JWTService, PasswordCrypto } from '../../shared/middlewares/services';
import dayjs from 'dayjs';
import { LogsProvider } from '../../database/providers/logs';


interface IBodyProps extends Omit<IPaciente, 'id' | 'nome' | 'instituicao_vinc' | 'role'| 'cpf'>{}


export const signInValidation = validation((getSchema) =>({
    
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(6),
        senha: yup.string().required().min(6),
    
    }))
}));


export const signIn = async (req:Request<{}, {}, IBodyProps>, res:Response) => {

    const raw = req.headers.idUsuario;
        const trans = typeof raw === 'string'
        ? parseInt(raw)
        : Array.isArray(raw)
        ? parseInt(raw[0])
        : NaN;
        const role = req.headers.ROLEUsuario
    
        interface IBodyProps extends Omit<ILogs, 'id'>{}
    

    const {email, senha} = req.body;


    const paciente = await PacienteProvider.getByEmail(email);
    if (paciente instanceof Error) {
        
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha invalidos'
            }
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(senha, paciente.senha)
    if(!passwordMatch){
        const logsData: IBodyProps = {
            usuario: `Nome do Usuario:${paciente.nome}`,
            acao: `tentou logar `,
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }

        LogsProvider.create(logsData)

        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha invalidos'
            }
        });

    } else{


        const accessToken = JWTService.sign({uid: paciente.id, role: paciente.role, nome: paciente.nome, cpf: paciente.cpf});
        if(accessToken === 'JWT_SECRET_NOT_FOUND'){

            const logsData: IBodyProps = {
            usuario: `Nome do Usuario:${paciente.nome}`,
            acao: `tentou logar `,
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        }

        LogsProvider.create(logsData)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'erro ao gerar o token de acesso'
                }
            })

        }

        const logsData: IBodyProps = {
            usuario: `Nome do Usuario:${paciente.nome}`,
            acao: `tentou logar `,
            detalhes: 'login realizado',
            data_hora: new Date().toLocaleString(),
        }

        LogsProvider.create(logsData)
        const nome = paciente.nome
        const role = paciente.role
        const id = paciente.id
        const cpf = paciente.cpf
        
        return res.status(StatusCodes.OK).json({accessToken,nome,role,id,cpf})
    }
    

    
 
    

    
};
