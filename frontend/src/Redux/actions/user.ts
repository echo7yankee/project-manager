import axios from 'axios';
import { GET_USER, GET_USER_LOADING } from '../types';

export const getUser = (id) => {
    return async (dispatch) => {
        try {

            dispatch({
                type: GET_USER_LOADING,
            });

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
};