import { GET_USER } from '../types'

const initState = {
    user: {},
}

export function userReducer(state, action) {
    if (!state) {
        state = initState;
    }

    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            }

        default: return state;
    }
}