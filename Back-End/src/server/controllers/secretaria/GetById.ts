import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { SecretariaProvider } from "../../database/providers/secretaria";
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
        
            interface IBodyProps extends Omit<ILogs, 'id'> { }

   if (!req.params.id) {
     const logsData: IBodyProps = {
                usuario: `Tipo do Usuario:${role}, ID:${trans}`,
                acao: 'tentou listar um funcionario especifico da secretaria',
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

   const result = await SecretariaProvider.getById(req.params.id);
   if (result instanceof Error) {
    const logsData: IBodyProps = {
                usuario: `Tipo do Usuario:${role}, ID:${trans}`,
                acao: 'tentou listar um funcionario especifico da secretaria',
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
                acao: 'tentou listar um funcionario especifico da secretaria',
                detalhes: 'usuario listado',
                data_hora: new Date().toLocaleString(),
            }
            LogsProvider.create(logsData)


            
        


            
   return res.status(StatusCodes.OK).json(result);
};