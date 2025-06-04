import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as getAllPac from './GetAllPac';
import * as getAllMed from './GetAllMed';
import * as getAllAprov from './GetByAprov';
import * as getAllPendent from './GetByPendent'


export const ExamesController = {
    ...create,
    ...getAll,
    ...getById,
    ...deleteById,
    ...updateById,
    ...getAllPac,
    ...getAllMed,
    ...getAllAprov,
    ...getAllPendent

};