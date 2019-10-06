import { SET_AUTH_LOADING, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types'

const initState = {
    isLoading: false,
    authenticated: false
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
                authenticated: true
            }

        case SET_UNAUTHENTICATED:
            return initState;

        default: return state
    }
}