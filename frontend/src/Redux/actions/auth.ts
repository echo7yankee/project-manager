import { SET_AUTH_LOADING, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_ERRORS } from '../types';
import axios from 'axios';

//ts types
import { RegisterCredentials, LoginCredentials } from '../../TSTypes/Credentials';

export class Auth {


    public registerUser(credentials: RegisterCredentials, history) {
        return async (dispatch) => {

            try {
                dispatch({
                    type: SET_AUTH_LOADING
                })

                const response = await axios.post('/user/register', credentials);
                const { data } = response;

                this.setAuthorizationHeader(data.token)

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
            }
        }
    }

    public loginUser(credentials: LoginCredentials, history) {
        return async (dispatch) => {

            try {
                dispatch({
                    type: SET_AUTH_LOADING,
                })

                const response = await axios.post('/user/login', credentials);
                const { data } = response;

                this.setAuthorizationHeader(data.token)

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
            }
        }
    }

    public logoutUser() {
        return async (dispatch) => {
            try {
                localStorage.removeItem("FBIdToken");
                delete axios.defaults.headers.common.Authorization;
                dispatch({ type: SET_UNAUTHENTICATED });
            } catch (error) {
                console.log(error);
            }
        }
    }

    private setAuthorizationHeader = token => {
        const FBIdToken = token;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common.Authorization = FBIdToken;
    }

}
