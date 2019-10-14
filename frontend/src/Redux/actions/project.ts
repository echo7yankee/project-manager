import axios from 'axios';
import { GET_PROJECTS, SET_PROJECT_LOADING, UNSET_PROJECT_LOADING } from '../types';

export const getProjects = (id: string) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_PROJECT_LOADING,
            })

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
};

export const addProject = (name, id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_PROJECT_LOADING,
            })
            await axios.post('/project', { name }, {
                params: {
                    userId: id,
                },
            })
            dispatch({
                type: UNSET_PROJECT_LOADING,
            })
            dispatch(getProjects(id))
        } catch (error) {
            console.log(error);
        }
    }
}

export const removeProject = (userId, projectId) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_PROJECT_LOADING
            })
            await axios.delete(`/project/${projectId}`)
            dispatch({
                type: UNSET_PROJECT_LOADING
            })
            dispatch(getProjects(userId))
        } catch (error) {
            console.log(error);
        }
    }
}

export const editProject = (userId, projectId, newProjectValue) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_PROJECT_LOADING
            })

            await axios.put(`/project/${projectId}`, { name: newProjectValue })
            dispatch({
                type: UNSET_PROJECT_LOADING
            })
            dispatch(getProjects(userId))
        } catch (error) {
            console.log(error);
        }
    }
}