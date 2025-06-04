import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ILaboratorio } from "../../database/models";
import { LaboratorioProvider } from "../../database/providers/laboratorio";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';




interface IBodyProps extends Omit<ILaboratorio, 'id'> {}

export const createValidation = validation((getSchema) =>({
    
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        senha: yup.string().required().min(5),
        espec: yup.string().required().min(5),
        role: yup.string().optional(),
        email: yup.string().required(),    
    }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    
    
    const result = await LaboratorioProvider.create(req.body);
    

    if(result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};