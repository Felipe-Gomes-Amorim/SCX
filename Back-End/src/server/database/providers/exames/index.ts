import * as create from './Create';
import * as count from './Count';
import * as Delete from './Delete';
import * as getAll from './GetAll';
import * as getbyId from './GetById';
import * as updateById from './UpdateById';
import * as getAllPac from './GetAllPac';
import * as getAllMed from './GetAllMed';
import * as getAllAprove from './GetAllAprove';
import * as getAllPendent from './GetAllPendent';



export const ExamesProvider = {
    
    ...create,
    ...count,
    ...Delete,
    ...getAll,
    ...getbyId,
    ...updateById,
    ...getAllPac,
    ...getAllMed,
    ...getAllPendent,
    ...getAllAprove
    

}