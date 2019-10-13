import { GET_TASKS } from '../types'


const initState = {
    tasks: [],
}

export function taskReducer(state, action) {
    if (!state) {
        state = initState;
    }

    switch (action.type) {

        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload.data,
                projectName: action.payload.projectName
            }

        default: return state;
    }
}