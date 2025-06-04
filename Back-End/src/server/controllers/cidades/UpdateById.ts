import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as yup from 'yup';
import{validation} from '../../shared/middlewares/';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidade';

interface IparamProps{
    id?: number;
}
interface IBodyProps extends Omit<ICidade, 'id'>{}

export const updateByIdValidation = validation(getSchema =>({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),

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

const result = await CidadesProvider.updateById(req.params.id, req.body);
if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });
}

return res.status(StatusCodes.NO_CONTENT).json(result);
};
