import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as yup from 'yup';
import{validation} from '../../shared/middlewares/';
import { IEndereco } from '../../database/models';
import { EnderecoProvider } from '../../database/providers/endereco';

interface IparamProps{
    id?: number;
}
interface IBodyProps extends Omit<IEndereco, 'id'>{}

export const updateByIdValidation = validation(getSchema =>({
    body: getSchema<IBodyProps>(yup.object().shape({
        estado: yup.string().required().min(2),
        complemento: yup.string().required(),
        id_pac: yup.number().required(),
        rua: yup.string().required(),
        id_cidade: yup.number().required(),
        numero: yup.number().required(),
        cep: yup.number().required(),

    })),
    params: getSchema<IparamProps>(yup.object().shape({
        id: yup.number().required().min(3).moreThan(0),
    })),
}));

export const updateById = async (req:Request<IparamProps, {}, IBodyProps>, res: Response) =>  {

if(!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
            default: 'o parametro "id" precisa ser informado'
        }
    })
}

const result = await EnderecoProvider.updateById(req.params.id, req.body);
if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });
}

return res.status(StatusCodes.NO_CONTENT).json(result);
};
