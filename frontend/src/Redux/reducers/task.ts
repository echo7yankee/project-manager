import { GET_ALL_TASKS, GET_TASKS } from '../types'

const initState = {
    tasks: [],
    allTasks: [],
}

export function taskReducer(state, action) {
    if (!state) {
        state = initState;
    }

    switch (action.type) {
        case GET_ALL_TASKS:
            return {
                ...state,
                allTasks: action.payload,
            }

        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            }

        default: return state;
    }
}