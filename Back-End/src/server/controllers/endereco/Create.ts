import {Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';
import { IEndereco } from '../../database/models';
import { EnderecoProvider } from '../../database/providers/endereco';


interface IBodyProps extends Omit<IEndereco, 'id'>{}


export const createValidation = validation((getSchema) =>({
    
    body: getSchema<IBodyProps>(yup.object().shape({
        estado: yup.string().required().min(3),
        complemento: yup.string().required().min(5),
        id_pac: yup.number().required(),
        rua: yup.string().required(),
        id_cidade: yup.number().required(),
        numero: yup.number().required(),
        cep: yup.number().required(),
    
    }))
}));


export const create = async (req:Request<{}, {}, IEndereco>, res:Response) => {

    const result = await EnderecoProvider.create(req.body);
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