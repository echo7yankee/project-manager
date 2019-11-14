import { GET_USER, GET_USER_LOADING } from '../types'

//ts types
import { IUser } from '../../TSTypes/reducers/user';

const initState: IUser = {
    user: {},
    isLoading: false,
}

export function userReducer(state, action) {
    if (!state) {
        state = initState;
    }

    switch (action.type) {

        case GET_USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case GET_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            };

        default: return state;
    }
}