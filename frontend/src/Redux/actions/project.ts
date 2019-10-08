import axios from 'axios';
import { GET_PROJECTS } from '../types';

export const getProjects = (id: string) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/project', {
                params: {
                    userId: id,
                },
            })

            const { data } = response;

            dispatch({
                type: GET_PROJECTS,
                payload: data,
            })
        } catch (error) {
            console.log(error);
        }

    };
}
