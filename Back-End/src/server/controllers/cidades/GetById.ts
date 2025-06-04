import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { CidadesProvider } from "../../database/providers/cidade";

interface IparamProps {
    id?: number;
}
export const getByIdValidation = validation(getSchema => ({
    params: getSchema<IparamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const getById = async (req: Request<IparamProps>, res: Response) => {

   if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
            default: 'o parametro id precisa ser informado'
        }
    });
   }

   const result = await CidadesProvider.getById(req.params.id);
   if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });
   }

   return res.status(StatusCodes.OK).json(result);
};