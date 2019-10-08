import axios from 'axios';
import { GET_USER } from '../types';

export const getUser = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/user/${id}`)
            const { data } = response;
            dispatch({
                type: GET_USER,
                payload: data,
            })
        } catch (error) {
            console.log(error);
        }
    };
}

