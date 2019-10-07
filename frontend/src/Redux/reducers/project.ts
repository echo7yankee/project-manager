import { GET_PROJECTS } from '../types'

const initState = {
    projects: [],
}

export function projectReducer(state, action) {
    if (!state) {
        state = initState;
    }

    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }

        default: return state;
    }
}