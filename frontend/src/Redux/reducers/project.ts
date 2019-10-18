import { GET_PROJECTS, SET_PROJECT_LOADING } from '../types'

//ts types
import { IProject } from '../../TSTypes/reducers/project';

const initState: IProject = {
    projects: [],
    isLoading: false,
}

export function projectReducer(state, action) {
    if (!state) {
        state = initState;
    }

    switch (action.type) {

        case SET_PROJECT_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                isLoading: false,
            }

        default: return state;
    }
}