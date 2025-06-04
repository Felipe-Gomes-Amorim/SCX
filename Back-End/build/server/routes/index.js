"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../shared/middlewares");
const router = (0, express_1.Router)();
exports.router = router;
// funcionando 
router.post('/cidades', middlewares_1.ensureAuthenticated, controllers_1.CidadesController.createValidation, controllers_1.CidadesController.create);
router.get('/cidades', middlewares_1.ensureAuthenticated, controllers_1.CidadesController.getAllValidation, controllers_1.CidadesController.getAll);
router.get('/cidades/:id', middlewares_1.ensureAuthenticated, controllers_1.CidadesController.getByIdValidation, controllers_1.CidadesController.getById);
router.delete('/cidades/:id', middlewares_1.ensureAuthenticated, controllers_1.CidadesController.deleteValidation, controllers_1.CidadesController.deleteById);
router.put('/cidades/:id', middlewares_1.ensureAuthenticated, controllers_1.CidadesController.updateByIdValidation, controllers_1.CidadesController.updateById);
//funcionando
router.post('/adm', controllers_1.AdmController.createValidation, controllers_1.AdmController.create);
router.post('/entrarAdm', controllers_1.AdmController.signInValidation, controllers_1.AdmController.signIn);
router.delete('/adm/:id', middlewares_1.ensureAuthenticated, controllers_1.AdmController.deleteValidation, controllers_1.AdmController.deleteById);
router.get('/adm', middlewares_1.ensureAuthenticated, controllers_1.AdmController.getAllValidation, controllers_1.AdmController.getAll);
router.get('/adm/:id', middlewares_1.ensureAuthenticated, controllers_1.AdmController.getByIdValidation, controllers_1.AdmController.getById);
router.put('/adm/:id', middlewares_1.ensureAuthenticated, controllers_1.AdmController.updateByIdValidation, controllers_1.AdmController.updateById);
//funcionando
router.post('/medico', middlewares_1.ensureAuthenticated, controllers_1.MedicoController.createValidation, controllers_1.MedicoController.create);
router.post('/entrarMedico', controllers_1.MedicoController.signInValidation, controllers_1.MedicoController.signIn);
router.delete('/medico/:id', middlewares_1.ensureAuthenticated, controllers_1.MedicoController.deleteValidation, controllers_1.MedicoController.deleteById);
router.get('/medico', middlewares_1.ensureAuthenticated, controllers_1.MedicoController.getAllValidation, controllers_1.MedicoController.getAll);
router.get('/medico/:id', middlewares_1.ensureAuthenticated, controllers_1.MedicoController.getByIdValidation, controllers_1.MedicoController.getById);
router.put('/medico/:id', middlewares_1.ensureAuthenticated, controllers_1.MedicoController.updateByIdValidation, controllers_1.MedicoController.updateById);
//funcionando
router.post('/secretaria', middlewares_1.ensureAuthenticated, controllers_1.SecretariaController.createValidation, controllers_1.SecretariaController.create);
router.post('/entrarSecretaria', controllers_1.SecretariaController.signInValidation, controllers_1.SecretariaController.signIn);
router.delete('/secretaria/:id', middlewares_1.ensureAuthenticated, controllers_1.SecretariaController.deleteValidation, controllers_1.SecretariaController.deleteById);
router.get('/secretaria', middlewares_1.ensureAuthenticated, controllers_1.SecretariaController.getAllValidation, controllers_1.SecretariaController.getAll);
router.get('/secretaria/:id', middlewares_1.ensureAuthenticated, controllers_1.SecretariaController.getByIdValidation, controllers_1.SecretariaController.getById);
router.put('/secretaria/:id', middlewares_1.ensureAuthenticated, controllers_1.SecretariaController.updateByIdValidation, controllers_1.SecretariaController.updateById);
//funcionando
router.post('/laboratorio', middlewares_1.ensureAuthenticated, controllers_1.LaboratorioController.createValidation, controllers_1.LaboratorioController.create);
router.post('/entrarLaboratorio', controllers_1.LaboratorioController.signInValidation, controllers_1.LaboratorioController.signIn);
router.delete('/laboratorio/:id', middlewares_1.ensureAuthenticated, controllers_1.LaboratorioController.deleteByIdValidation, controllers_1.LaboratorioController.deleteById);
router.get('/laboratorio', middlewares_1.ensureAuthenticated, controllers_1.LaboratorioController.getAllValidation, controllers_1.LaboratorioController.getAll);
router.get('/laboratorio/:id', middlewares_1.ensureAuthenticated, controllers_1.LaboratorioController.getByIdValidation, controllers_1.LaboratorioController.getById);
router.put('/laboratorio/:id', middlewares_1.ensureAuthenticated, controllers_1.LaboratorioController.updateByIdValidation, controllers_1.LaboratorioController.updateById);
//funcionando
router.post('/paciente', middlewares_1.ensureAuthenticated, controllers_1.PacienteController.createValidation, controllers_1.PacienteController.create);
router.post('/entrarPaciente', controllers_1.PacienteController.signInValidation, controllers_1.PacienteController.signIn);
router.delete('/paciente/:id', middlewares_1.ensureAuthenticated, controllers_1.PacienteController.deleteValidation, controllers_1.PacienteController.deleteById);
router.get('/paciente', middlewares_1.ensureAuthenticated, controllers_1.PacienteController.getAllValidation, controllers_1.PacienteController.getAll);
router.get('/paciente/:id', middlewares_1.ensureAuthenticated, controllers_1.PacienteController.getByIdValidation, controllers_1.PacienteController.getById);
router.put('/paciente/:id', middlewares_1.ensureAuthenticated, controllers_1.PacienteController.updateByIdValidation, controllers_1.PacienteController.updateById);
//funcionando
router.post('/endereco', middlewares_1.ensureAuthenticated, controllers_1.EnderecoController.createValidation, controllers_1.EnderecoController.create);
router.delete('/endereco/:id', middlewares_1.ensureAuthenticated, controllers_1.EnderecoController.deleteValidation, controllers_1.EnderecoController.deleteById);
router.get('/endereco', middlewares_1.ensureAuthenticated, controllers_1.EnderecoController.getAllValidation, controllers_1.EnderecoController.getAll);
router.get('/endereco/:id', middlewares_1.ensureAuthenticated, controllers_1.EnderecoController.getByIdValidation, controllers_1.EnderecoController.getById);
router.put('/endereco/:id', middlewares_1.ensureAuthenticated, controllers_1.EnderecoController.updateByIdValidation, controllers_1.EnderecoController.updateById);
//funcionando
router.post('/exames', middlewares_1.ensureAuthenticated, controllers_1.ExamesController.createValidation, controllers_1.ExamesController.create);
router.delete('/exames/:id', middlewares_1.ensureAuthenticated, controllers_1.ExamesController.deleteValidation, controllers_1.ExamesController.deleteById);
router.get('/exames', middlewares_1.ensureAuthenticated, controllers_1.ExamesController.getAllValidation, controllers_1.ExamesController.getAll);
router.get('/exames/:id', middlewares_1.ensureAuthenticated, controllers_1.ExamesController.getByIdValidation, controllers_1.ExamesController.getById);
router.get('/examesPac', middlewares_1.ensureAuthenticated, controllers_1.ExamesController.getAllPacValidation, controllers_1.ExamesController.getAllPac);
router.get('/examesMed/:id', middlewares_1.ensureAuthenticated, controllers_1.ExamesController.getAllMedValidation, controllers_1.ExamesController.getAllMed);
router.put('/exames/:id', middlewares_1.ensureAuthenticated, controllers_1.ExamesController.updateByIdValidation, controllers_1.ExamesController.updateById);
router.get('/', (req, res) => {
    return res.send('felipe é gay');
});
