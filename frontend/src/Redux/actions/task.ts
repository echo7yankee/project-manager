import axios from 'axios'
import { GET_TASKS, GET_ALL_TASKS, SET_TASK_LOADING, UNSET_TASK_LOADING } from '../types';

export function getTasks(projectId) {
    return async (dispatch) => {
        dispatch({
            type: SET_TASK_LOADING
        })
        try {
            const response = await axios.get('/task', {
                params: {
                    projectId,
                },
            })

            const { data } = response;

            dispatch({
                type: GET_TASKS,
                payload: data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getAllTasks() {
    return async (dispatch) => {
        try {
            const response = await axios.get('/tasks')

            const { data } = response;

            dispatch({
                type: GET_ALL_TASKS,
                payload: data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function createTask(projectId, task) {
    return async (dispatch) => {
        dispatch({
            type: SET_TASK_LOADING
        })
        try {
            await axios.post('/task', task, {
                params: {
                    projectId,
                }
            })
            dispatch({
                type: UNSET_TASK_LOADING
            })
            dispatch(getTasks(projectId));
        } catch (error) {
            console.log(error);
        }
    }
}

export function removeTask(projectId, taskId) {
    return async (dispatch) => {
        dispatch({
            type: SET_TASK_LOADING
        })
        try {
            await axios.delete(`/task/${taskId}`);
            dispatch({
                type: UNSET_TASK_LOADING
            })
            dispatch(getTasks(projectId));
        } catch (error) {
            console.log(error);
        }
    }
}

export function updateTask(projectId, taskId, newTaskValue) {
    return async (dispatch) => {
        dispatch({
            type: SET_TASK_LOADING
        })
        try {
            await axios.put(`/task/${taskId}`, newTaskValue);
            dispatch({
                type: UNSET_TASK_LOADING
            })
            dispatch(getTasks(projectId));
        } catch (error) {
            console.log(error);
        }
    }
}