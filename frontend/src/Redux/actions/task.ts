import axios from 'axios'
import { GET_TASKS } from '../types';

export function getTasks(projectId) {
    return async (dispatch) => {
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

export function createTask(projectId, task) {
    return async (dispatch) => {
        try {

            await axios.post('/task', task, {
                params: {
                    projectId,
                }
            })

            dispatch(getTasks(projectId));
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