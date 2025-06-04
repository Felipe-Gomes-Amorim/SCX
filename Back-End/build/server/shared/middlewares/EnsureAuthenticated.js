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
exports.ensureAuthenticated = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("./services");
const logs_1 = require("../../database/providers/logs");
const ensureAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { authorization } = req.headers;
    if (!authorization) {
        const logsData = {
            usuario: `indefinido`,
            acao: 'indefinida',
            detalhes: 'usuario não authenticado ',
            data_hora: new Date().toLocaleString(),
        };
        logs_1.LogsProvider.create(logsData);
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'não autenticado' }
        });
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
        const logsData = {
            usuario: `indefinido`,
            acao: 'indefinida',
            detalhes: 'usuario não authenticado ',
            data_hora: new Date().toLocaleString(),
        };
        logs_1.LogsProvider.create(logsData);
        console.log("Vai tentar criar o log");
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'não autenticado' }
        });
    }
    const jwtData = services_1.JWTService.verify(token);
    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        const logsData = {
            usuario: `indefinido`,
            acao: 'indefinida',
            detalhes: 'usuario não authenticado ',
            data_hora: new Date().toLocaleString(),
        };
        logs_1.LogsProvider.create(logsData);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: 'Erro ao verificar o token' }
        });
    }
    else if (jwtData === 'INVALID_TOKEN') {
        const logsData = {
            usuario: `indefinido`,
            acao: 'indefinida',
            detalhes: 'usuario não authenticado ',
            data_hora: new Date().toLocaleString(),
        };
        logs_1.LogsProvider.create(logsData);
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'não autenticado' }
        });
    }
    req.headers.idUsuario = jwtData.uid.toString();
    req.headers.ROLEUsuario = (_a = jwtData.role) === null || _a === void 0 ? void 0 : _a.toString();
    return next();
});
exports.ensureAuthenticated = ensureAuthenticated;
