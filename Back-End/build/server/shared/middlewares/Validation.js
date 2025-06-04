"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = require("../../database/providers/logs");
const validation = (getAllSchemas) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const raw = req.headers.idUsuario;
    const trans = typeof raw === 'string'
        ? parseInt(raw)
        : Array.isArray(raw)
            ? parseInt(raw[0])
            : NaN;
    const role = req.headers.ROLEUsuario;
    const schemas = getAllSchemas(schema => schema);
    const errorsResult = {};
    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key], { abortEarly: false });
        }
        catch (err) {
            const logsData = {
                usuario: `Tipo do Usuario:${role}, ID:${trans}`,
                acao: 'indefinida',
                detalhes: 'erro interno',
                data_hora: new Date().toLocaleString(),
            };
            logs_1.LogsProvider.create(logsData);
            const yupError = err;
            const errors = {};
            yupError.inner.forEach(error => {
                if (error.path === undefined)
                    return;
                errors[error.path] = error.message;
            });
            errorsResult[key] = errors;
        }
    });
    if (Object.entries(errorsResult).length === 0) {
        return next();
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }
});
exports.validation = validation;
