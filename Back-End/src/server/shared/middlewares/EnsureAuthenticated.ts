import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "./services";
import { ILogs } from "../../database/models/Logs";
import { LogsProvider } from "../../database/providers/logs";



export const ensureAuthenticated: RequestHandler = async (req, res, next) => {

    
        interface IBodyProps extends Omit<ILogs, 'id'> {}
        
    const {authorization} = req.headers;
    

    if (!authorization) {
        
        const logsData: IBodyProps = {
                    usuario: `indefinido`,
                    acao: 'indefinida',
                    detalhes: 'usuario não authenticado ',
                    data_hora: new Date().toLocaleString(),
                }
                LogsProvider.create(logsData)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {default: 'não autenticado'}

        });
    }

    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer') {

       const logsData: IBodyProps = {
                    usuario: `indefinido`,
                    acao: 'indefinida',
                    detalhes: 'usuario não authenticado ',
                    data_hora: new Date().toLocaleString(),
                }
                LogsProvider.create(logsData)
                console.log("Vai tentar criar o log");

        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {default: 'não autenticado'}

        });
    }

    const jwtData = JWTService.verify(token);
    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        const logsData: IBodyProps = {
                    usuario: `indefinido`,
                    acao: 'indefinida',
                    detalhes: 'usuario não authenticado ',
                    data_hora: new Date().toLocaleString(),
                }
                LogsProvider.create(logsData)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {default: 'Erro ao verificar o token'}

        });
    } else  if (jwtData === 'INVALID_TOKEN') {
       const logsData: IBodyProps = {
                    usuario: `indefinido`,
                    acao: 'indefinida',
                    detalhes: 'usuario não authenticado ',
                    data_hora: new Date().toLocaleString(),
                }
                LogsProvider.create(logsData)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {default: 'não autenticado'}

        });
    }

    req.headers.idUsuario = jwtData.uid.toString();
    req.headers.ROLEUsuario = jwtData.role?.toString();
    req.headers.SenhaUsuario = jwtData.senha?.toString();
    req.headers.NomeUsuario = jwtData.nome?.toString();
    req.headers.CpfUsuario = jwtData.cpf?.toString();

    return next();
};
