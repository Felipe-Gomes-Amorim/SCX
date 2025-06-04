import {Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';
import { IAdm } from '../../database/models';
import { AdmProvider } from '../../database/providers/adm';


interface IBodyProps extends Omit<IAdm, 'id'>{}


export const createValidation = validation((getSchema) =>({
    
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        senha: yup.string().required().min(5),
        role: yup.string().optional(),
        email: yup.string().required()
    
    }))
}));


export const create = async (req:Request<{}, {}, IAdm>, res:Response) => {

    const result = await AdmProvider.create(req.body);
    
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    

    
 
    

    console.log(req.body);


    return res.status(StatusCodes.CREATED).json(result);
};