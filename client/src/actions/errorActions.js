import { GET_ERRORS, CLEAR_ERRORS } from './types';

//return errors
export const returnErrors = (msg,status,id=null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
}

//clear_errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}