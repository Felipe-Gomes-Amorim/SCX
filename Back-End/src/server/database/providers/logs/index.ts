import * as create from './Create';
import * as count from './Count';
import * as Delete from './Delete';
import * as getAll from './GetAll';
import * as getbyId from './GetById';





export const LogsProvider = {
    
    ...create,
    ...count,
    ...Delete,
    ...getAll,
    ...getbyId,
    

}