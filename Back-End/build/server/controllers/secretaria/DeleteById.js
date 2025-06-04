"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteById = exports.deleteValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
const middlewares_1 = require("../../shared/middlewares");
const secretaria_1 = require("../../database/providers/secretaria");
const logs_1 = require("../../database/providers/logs");
exports.deleteValidation = (0, middlewares_1.validation)(getSchema => ({
    params: getSchema(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const raw = req.headers.idUsuario;
    const trans = typeof raw === 'string'
        ? parseInt(raw)
        : Array.isArray(raw)
            ? parseInt(raw[0])
            : NaN;
    const role = req.headers.ROLEUsuario;
    if (!req.params.id) {
        const logsData = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou deletar um funcionario',
            detalhes: 'erro interno',
            data_hora: new Date().toLocaleString(),
        };
        logs_1.LogsProvider.create(logsData);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'o parametro "id" precisa ser informado'
            }
        });
    }
    const result = yield secretaria_1.SecretariaProvider.deleteById(req.params.id);
    if (result instanceof Error) {
        const logsData = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou deletar um funcionarisso',
            detalhes: 'erro internod',
            data_hora: new Date().toLocaleString(),
        };
        logs_1.LogsProvider.create(logsData);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    else if (req.headers.ROLEUsuario !== 'adm') {
        const logsData = {
            usuario: `Tipo do Usuario:${role}, ID:${trans}`,
            acao: 'tentou deletar um funcionario',
            detalhes: 'não autroizado',
            data_hora: new Date().toLocaleString(),
        };
        logs_1.LogsProvider.create(logsData);
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'voce não está autorizado'
            }
        });
    }
    const logsData = {
        usuario: `Tipo do Usuario:${role}, ID:${trans}`,
        acao: 'tentou deletar um funcionario',
        detalhes: 'deletado com sucesso',
        data_hora: new Date().toLocaleString(),
    };
    logs_1.LogsProvider.create(logsData);
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
});
exports.deleteById = deleteById;
