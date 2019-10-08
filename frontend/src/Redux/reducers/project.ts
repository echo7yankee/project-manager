import { GET_PROJECTS, SET_PROJECT_LOADING, UNSET_PROJECT_LOADING } from '../types'

const initState = {
    projects: [],
    isLoading: false,
}

export function projectReducer(state, action) {
    if (!state) {
        state = initState;
    }

    switch (action.type) {

        case SET_PROJECT_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case UNSET_PROJECT_LOADING:
            return {
                ...state,
                isLoading: false
            }

        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }

        default: return state;
    }
}