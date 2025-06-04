import { StatusCodes } from "http-status-codes";
import { ILaboratorio, ILogs } from "../../database/models";
import { validation } from "../../shared/middlewares";
import { LaboratorioProvider } from "../../database/providers/laboratorio";
import * as yup from 'yup'
import { Request, Response } from "express";



interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<ILaboratorio, 'id'> {}

export const updateByIdValidation = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
            nome: yup.string().required().min(3),
            senha: yup.string().required().min(5),
            espec: yup.string().required().min(5),
            role: yup.string().optional(),
            email: yup.string().required(),
                
        })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) =>{

    const raw = req.headers.idUsuario;
                const trans = typeof raw === 'string'
                    ? parseInt(raw)
                    : Array.isArray(raw)
                        ? parseInt(raw[0])
                        : NaN;
                const role = req.headers.ROLEUsuario
            
                interface IBodyProps extends Omit<ILogs, 'id'> {}
                
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'o parametro "id" precisa ser informado'
            }
        });
    }

    const result = await LaboratorioProvider.updateById(req.params.id, req.body);
    if(result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
}