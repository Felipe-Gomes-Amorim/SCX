import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import { CidadesController,  AdmController, MedicoController,SecretariaController, PacienteController, LaboratorioController,EnderecoController, ExamesController,  } from '../controllers';
import{ensureAuthenticated} from '../shared/middlewares'
import { LogsController } from '../controllers/logs';





const router = Router();
 
// funcionando 
router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteValidation, CidadesController.deleteById);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
//funcionando
router.post('/adm', AdmController.createValidation, AdmController.create);
router.post('/entrarAdm', AdmController.signInValidation, AdmController.signIn);
router.delete('/adm/:id', ensureAuthenticated, AdmController.deleteValidation, AdmController.deleteById);
router.get('/adm', ensureAuthenticated, AdmController.getAllValidation, AdmController.getAll, );
router.get('/adm/:id', ensureAuthenticated, AdmController.getByIdValidation, AdmController.getById);
router.put('/adm/:id', ensureAuthenticated, AdmController.updateByIdValidation, AdmController.updateById);
//funcionando
router.post('/medico', ensureAuthenticated, MedicoController.createValidation, MedicoController.create);
router.post('/entrarMedico', MedicoController.signInValidation, MedicoController.signIn);
router.delete('/medico/:id', ensureAuthenticated, MedicoController.deleteValidation, MedicoController.deleteById);
router.get('/medico', ensureAuthenticated, MedicoController.getAllValidation, MedicoController.getAll, );
router.get('/medico/:id', ensureAuthenticated, MedicoController.getByIdValidation, MedicoController.getById);
router.get('/medicoCRM/:crm', ensureAuthenticated, MedicoController.getByCRMValidation, MedicoController.getByCRM);
router.put('/medico/:id', ensureAuthenticated, MedicoController.updateByIdValidation, MedicoController.updateById);
//funcionando
router.post('/secretaria',ensureAuthenticated, SecretariaController.createValidation, SecretariaController.create);
router.post('/entrarSecretaria', SecretariaController.signInValidation, SecretariaController.signIn);
router.delete('/secretaria/:id', ensureAuthenticated, SecretariaController.deleteValidation, SecretariaController.deleteById);
router.get('/secretaria', ensureAuthenticated, SecretariaController.getAllValidation, SecretariaController.getAll, );
router.get('/secretaria/:id', ensureAuthenticated, SecretariaController.getByIdValidation, SecretariaController.getById);
router.put('/secretaria/:id', ensureAuthenticated, SecretariaController.updateByIdValidation, SecretariaController.updateById);
//funcionando
router.post('/laboratorio', ensureAuthenticated, LaboratorioController.createValidation, LaboratorioController.create);
router.post('/entrarLaboratorio', LaboratorioController.signInValidation, LaboratorioController.signIn);
router.delete('/laboratorio/:id', ensureAuthenticated, LaboratorioController.deleteByIdValidation, LaboratorioController.deleteById);
router.get('/laboratorio', ensureAuthenticated, LaboratorioController.getAllValidation, LaboratorioController.getAll, );
router.get('/laboratorio/:id', ensureAuthenticated, LaboratorioController.getByIdValidation, LaboratorioController.getById);
router.put('/laboratorio/:id', ensureAuthenticated, LaboratorioController.updateByIdValidation, LaboratorioController.updateById);
//funcionando
router.post('/paciente', ensureAuthenticated, PacienteController.createValidation, PacienteController.create);
router.post('/entrarPaciente', PacienteController.signInValidation, PacienteController.signIn);
router.delete('/paciente/:id', ensureAuthenticated, PacienteController.deleteValidation, PacienteController.deleteById);
router.get('/paciente', ensureAuthenticated, PacienteController.getAllValidation, PacienteController.getAll, );
router.get('/paciente/:id', ensureAuthenticated, PacienteController.getByIdValidation, PacienteController.getById);
router.get('/pacienteCPF/:cpf', ensureAuthenticated, PacienteController.getByCPFValidation, PacienteController.getByCPF);
router.put('/paciente/:id', ensureAuthenticated, PacienteController.updateByIdValidation, PacienteController.updateById);
router.get('/pacienteemail/:id', ensureAuthenticated, PacienteController.getByIdValidation, PacienteController.email);
//funcionando
router.post('/endereco', ensureAuthenticated, EnderecoController.createValidation, EnderecoController.create);
router.delete('/endereco/:id', ensureAuthenticated, EnderecoController.deleteValidation, EnderecoController.deleteById);
router.get('/endereco', ensureAuthenticated, EnderecoController.getAllValidation, EnderecoController.getAll, );
router.get('/endereco/:id', ensureAuthenticated, EnderecoController.getByIdValidation, EnderecoController.getById);
router.put('/endereco/:id', ensureAuthenticated, EnderecoController.updateByIdValidation, EnderecoController.updateById);
//funcionando
router.post('/exames', ensureAuthenticated, ExamesController.createValidation, ExamesController.create);
router.delete('/exames/:id', ensureAuthenticated, ExamesController.deleteValidation, ExamesController.deleteById);
router.get('/exames', ensureAuthenticated, ExamesController.getAllValidation, ExamesController.getAll, );
router.get('/exames/:id', ensureAuthenticated, ExamesController.getByIdValidation, ExamesController.getById);
router.get('/examesPac/:cpf', ensureAuthenticated, ExamesController.getAllPacValidation, ExamesController.getAllPac);
router.get('/examesMed/:id', ensureAuthenticated, ExamesController.getAllMedValidation, ExamesController.getAllMed);
router.put('/exames/:id', ensureAuthenticated, ExamesController.updateByIdValidation, ExamesController.updateById);

router.get('/examesAprov/:status', ensureAuthenticated, ExamesController.getByAproveValidation, ExamesController.getAllAprove);
router.get('/examesPendent/:status', ensureAuthenticated, ExamesController.getByPendentValidation, ExamesController.getAllPendent);

router.get('/logs', ensureAuthenticated, LogsController.getAllValidation, LogsController.getAll);


router.get('/', (req, res) => {
    return res.send('felipe é gay')

});

export {router};