import { GET_ALL_TASKS, GET_TASKS, SET_SHOW_TOAST_ADD,SET_TASK_LOADING, UNSET_SHOW_TOAST, SET_SHOW_TOAST_REMOVE, SET_ERRORS } from '../types';

const initState = {
    tasks: [],
    allTasks: [],
    isLoading: false,
    showToast: false,
    toastText:'',
    errors:{}
}

export function taskReducer(state, action) {
    if (!state) {
        state = initState;
    }

    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors:action.payload
            }
        case SET_TASK_LOADING:
            return {
                ...state,
                isLoading: true,
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
        case SET_SHOW_TOAST_ADD:
            return {
                ...state,
                showToast: true,
                toastText: 'Task added',
                errors:{},
            };
        case SET_SHOW_TOAST_REMOVE:
            return {
                ...state,
                showToast:true,
                toastText:'Task removed',
            }
        case UNSET_SHOW_TOAST:
            return {
                ...state,
                    showToast: false,
            };

        default: return state;
    }
}