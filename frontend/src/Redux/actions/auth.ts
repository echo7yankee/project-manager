import { SET_AUTH_LOADING, SET_AUTHENTICATED, SET_ERRORS } from '../types';
import axios from 'axios';

//ts types
import { RegisterCredentials } from '../../TSTypes/Credentials';

export function registerUser(credentials: RegisterCredentials) {
    return async function (dispatch) {

        try {
            dispatch({
                type: SET_AUTH_LOADING
            })

            const response = await axios.post('/user/register', credentials);
            const { data } = response;

            console.log(data);

            dispatch({
                type: SET_AUTHENTICATED
            })

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: SET_ERRORS,
                payload: error.response ? error.response.data : null
            })
        }
    }
}