import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as yup from 'yup';
import {validation} from '../../shared/middlewares'
import { CidadesProvider } from '../../database/providers/cidade';

interface IParamProps {
    id?: number;
}
export const deleteValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {

   if(!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
            default: 'o parametro "id" precisa ser informado'
        }
    });
   }

   const result = await CidadesProvider.Delete(req.params.id);
   if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });
   }
        



    console.log(req.params);
    return res.status(StatusCodes.NO_CONTENT).send()
}; 
