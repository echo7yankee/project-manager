import { SET_AUTH_LOADING, SET_AUTHENTICATED, SET_ERRORS, SET_UNAUTHENTICATED } from '../types'

//ts types
import { IAuth } from '../../TSTypes/reducers/auth';

const initState: IAuth = {
    isLoading: false,
    authenticated: false,
    errors: {}
}

export function authReducer(state, action) {
    if (!state) {
        state = initState
    }

    switch (action.type) {

        case SET_AUTH_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case SET_AUTHENTICATED:
            return {
                ...state,
                isLoading: false,
                authenticated: true,
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        case SET_UNAUTHENTICATED:
            return initState;

        default: return state
    }
}