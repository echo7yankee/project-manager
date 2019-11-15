import axios from 'axios';
import configData from '../../config/config.json';
import { SET_AUTH_LOADING, SET_AUTHENTICATED, SET_ERRORS, SET_UNAUTHENTICATED, UNSET_ERRORS, SET_TOAST_UPDATE_AUTH, UNSET_TOAST_UPDATE_AUTH } from '../types';

//ts types
import { LoginCredentials, RegisterCredentials } from '../../TSTypes/Credentials';
import { getUser } from './user';

export function registerUser(credentials: RegisterCredentials, history) {
    return async (dispatch) => {

        try {
            dispatch({
                type: SET_AUTH_LOADING
            })

            const response = await axios.post('/user/register', credentials);
            const { data } = response;

            setAuthorizationHeader(data.token)

            history.push('/')

            dispatch({
                type: SET_AUTHENTICATED
            })

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: SET_ERRORS,
                payload: error.response ? error.response.data : null
            })
            setTimeout(() => {
                dispatch({
                    type: UNSET_ERRORS,
                });
            }, configData.timeOutForToasterInSeconds);
        }
    }
}

export function loginUser(credentials: LoginCredentials, history) {
    return async (dispatch) => {

        try {
            dispatch({
                type: SET_AUTH_LOADING,
            })

            const response = await axios.post('/user/login', credentials);
            const { data } = response;

            setAuthorizationHeader(data.token)

            history.push('/')

            dispatch({
                type: SET_AUTHENTICATED,
            })

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: SET_ERRORS,
                payload: error.response ? error.response.data : null,
            })
            setTimeout(() => {
                dispatch({
                    type: UNSET_ERRORS,
                });
            }, configData.timeOutForToasterInSeconds);
        }
    }
}

export function updateUser(id, newUser) {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_AUTH_LOADING,
            })

            await axios.put(`/user/update/${id}`, newUser);

            dispatch({
                type: SET_TOAST_UPDATE_AUTH,
            })

            setTimeout(() => {
                dispatch({
                    type: UNSET_TOAST_UPDATE_AUTH,
                });
            }, configData.timeOutForToasterInSeconds);

            dispatch(getUser(id));

        } catch (error) {
            console.log(error.response)
            dispatch({
                type: SET_ERRORS,
                payload: error.response ? error.response.data : null,
            });
            setTimeout(() => {
                dispatch({
                    type: UNSET_ERRORS,
                });
            }, configData.timeOutForErrorsInSeconds);
        }
    }
}

export function logoutUser() {
    return async (dispatch) => {
        try {
            localStorage.removeItem('FBIdToken');
            delete axios.defaults.headers.common.Authorization;
            dispatch({ type: SET_UNAUTHENTICATED });
        } catch (error) {
            console.log(error);
        }
    }
}

export function removeUser(id: string, password: { password: string }) {
    return async (dispatch) => {
        dispatch({
            type: SET_AUTH_LOADING,
        })
        try {
            await axios.delete(`/user/remove/${id}`, { data: password });
            dispatch(logoutUser());
        } catch (error) {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            })
            setTimeout(() => {
                dispatch({
                    type: UNSET_ERRORS,
                });
            }, configData.timeOutForErrorsInSeconds);
        }
    };
}

const setAuthorizationHeader = token => {
    const FBIdToken = token;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common.Authorization = FBIdToken;
}
