import * as updateById from './UpdateById';
import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getAll from './GetAll';
import * as GetById from './GetById';
import * as signIn from './SignIn'

export const LaboratorioController = {
    ...GetById,
    ...create,
    ...updateById,
    ...deleteById,
    ...getAll,
    ...signIn
}