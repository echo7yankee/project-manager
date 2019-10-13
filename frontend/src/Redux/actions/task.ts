import axios from 'axios'
import { GET_TASKS } from '../types';

export function getTasks(projectId) {
    return async (dispatch) => {
        try {
            const response = await axios.get('/task', {
                params: {
                    projectId
                },
            })

            const { data } = response;

            dispatch({
                type: GET_TASKS,
                payload: data
            })
        } catch (error) {
            console.log(error);

        }
    }
}

export function createTask(projectId) {
    return async (_dispatch) => {
        try {
            const response = await axios.post('/task', {
                params: {
                    projectId
                }
            })
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }
}