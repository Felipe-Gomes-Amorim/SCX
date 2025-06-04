import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as sigIn from './SignIn';
import * as email from './RecuperarEmail';
import * as getByCPF from './GetByCPF';



export const PacienteController = {
    ...create,
    ...getAll,
    ...getById,
    ...deleteById,
    ...updateById,
    ...sigIn,
    ...email,
    ...getByCPF

};
