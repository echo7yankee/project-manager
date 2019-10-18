import { GET_ALL_TASKS, GET_TASKS, SET_TASK_LOADING, SET_SHOW_TOAST } from '../types'

const initState = {
    tasks: [],
    allTasks: [],
    isLoading: false,
    showToast: false,
}

export function taskReducer(state, action) {
    if (!state) {
        state = initState;
    }

    switch (action.type) {
        case SET_TASK_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_TASKS:
            return {
                ...state,
                allTasks: action.payload,
            }
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                isLoading: false,
            };
        case SET_SHOW_TOAST:
            return {
                ...state,
                showToast: true
            }

        default: return state;
    }
}