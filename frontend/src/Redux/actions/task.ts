import axios from 'axios'
import {
    GET_ALL_TASKS,
    GET_TASKS,
    SET_TASK_LOADING,
    SET_SHOW_TOAST,
}
    from '../types';

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
        try {
            await axios.post('/task', task, {
                params: {
                    projectId,
                }
            })
            dispatch(getTasks(projectId));

            dispatch({
                type: SET_SHOW_TOAST
            })

        } catch (error) {
            console.log(error);
        }
    }
}

export function removeTask(projectId, taskId) {
    return async (dispatch) => {
        try {
            await axios.delete(`/task/${taskId}`);
            dispatch(getTasks(projectId));
        } catch (error) {
            console.log(error);
        }
    }
}

export function updateTask(projectId, taskId, newTaskValue) {
    return async (dispatch) => {
        try {
            await axios.put(`/task/${taskId}`, newTaskValue);
            dispatch(getTasks(projectId));
        } catch (error) {
            console.log(error);
        }
    }
}