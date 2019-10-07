import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { userReducer } from './user';
import { projectReducer } from './project';

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
})