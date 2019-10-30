import axios from 'axios';
import { GET_PROJECTS, SET_PROJECT_LOADING } from '../types';

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

export const addProject = (newProject, id, history) => {
    return async (dispatch) => {
        try {
            const response: any = await axios.post('/project', newProject, {
                params: {
                    userId: id,
                },
            })
            const { data } = response;

            history.push({
                pathname: `/project/${data._id}`,
                search: data.name,
                state: false
            });
            dispatch(getProjects(id))
        } catch (error) {
            console.log(error);
        }
    }
}

export const removeProject = (userId, projectId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/project/${projectId}`)
            dispatch(getProjects(userId))
        } catch (error) {
            console.log(error);
        }
    }
}

export const editProject = (userId, projectId, newProject) => {
    return async (dispatch) => {
        try {
            await axios.put(`/project/${projectId}`, newProject)
            dispatch(getProjects(userId))
        } catch (error) {
            console.log(error);
        }
    }
}