import * as count  from './Count';
import * as create from './Create';
import * as Delete from './Delete';
import * as getAll  from './GetAll';
import * as getById from './GetById';
import * as updateById from './UpdateById';





export const CidadesProvider = {
    
    ...create,
    ...Delete,
    ...getAll,
    ...getById,
    ...updateById,
    ...count
    

};

