import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema, ValidationError } from 'yup';
import { ILogs } from "../../database/models";
import { LogsProvider } from "../../database/providers/logs";

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;
type TallSchemas = Record<Tproperty, ObjectSchema<any>>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TallSchemas>;
type TGetSchema = <T extends object>(Schema: ObjectSchema<T>) => ObjectSchema<T>;

type Tproperty = 'body' | 'header' | 'params' | 'query';

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {

    const raw = req.headers.idUsuario;
    const trans = typeof raw === 'string'
        ? parseInt(raw)
        : Array.isArray(raw)
            ? parseInt(raw[0])
            : NaN;
    const role = req.headers.ROLEUsuario

    interface IBodyProps extends Omit<ILogs, 'id'> { }

    const schemas = getAllSchemas(schema => schema);

    const errorsResult: Record<string, Record<string, string>> = {};
    Object.entries(schemas).forEach(([key, schema]) => {

        try {
            schema.validateSync(req[key as Tproperty], { abortEarly: false });


        } catch (err) {

            const logsData: IBodyProps = {
                usuario: `Tipo do Usuario:${role}, ID:${trans}`,
                acao: 'indefinida',
                detalhes: 'erro interno',
                data_hora: new Date().toLocaleString(),
            }
            LogsProvider.create(logsData)

            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                errors[error.path] = error.message;

            });

            errorsResult[key] = errors;

        }

    });

    if (Object.entries(errorsResult).length === 0) {
        return next();
    } else {
        
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }

};

