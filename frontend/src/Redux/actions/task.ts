import axios from "axios";
import {
  GET_ALL_TASKS,
  GET_TASKS,
  SET_TASK_LOADING,
  SET_SHOW_TOAST_ADD,
  UNSET_SHOW_TOAST,
  SET_SHOW_TOAST_REMOVE,
  SET_SHOW_TOAST_EDIT,
  SET_ERRORS_TASK
} from "../types";

import configData from "../../config/config.json";

export function getTasks(projectId) {
  return async dispatch => {
    dispatch({
      type: SET_TASK_LOADING
    });
    try {
      const response = await axios.get("/task", {
        params: {
          projectId
        }
      });

      const { data } = response;

      dispatch({
        type: GET_TASKS,
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllTasks() {
  return async dispatch => {
    try {
      const response = await axios.get("/tasks");

      const { data } = response;

      dispatch({
        type: GET_ALL_TASKS,
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createTask(projectId, task) {
  return async dispatch => {
    try {
      await axios.post('/task', task, {
        params: {
          projectId
        }
      });
      dispatch(getTasks(projectId));

      dispatch({
        type: SET_SHOW_TOAST_ADD
      });

      setTimeout(() => {
        dispatch({
          type: UNSET_SHOW_TOAST
        });
      }, configData.timeOutForToasterInSeconds);
    } catch (error) {
      dispatch({
        type: SET_ERRORS_TASK,
        payload: error.response && error.response.data
      });
    }
  };
}

export function removeTask(projectId, taskId) {
  return async dispatch => {
    try {
      await axios.delete(`/task/${taskId}`);
      dispatch(getTasks(projectId));

      dispatch({
        type: SET_SHOW_TOAST_REMOVE
      });

      setTimeout(() => {
        dispatch({
          type: UNSET_SHOW_TOAST
        });
      }, configData.timeOutForToasterInSeconds);
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateTask(projectId: string, taskId: string, newTask) {
  return async dispatch => {
    try {
      await axios.put(`/task/${taskId}`, newTask);
      dispatch(getTasks(projectId));
      dispatch({
        type: SET_SHOW_TOAST_EDIT
      });

      setTimeout(() => {
        dispatch({
          type: UNSET_SHOW_TOAST
        });
      }, configData.timeOutForToasterInSeconds);
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateAllTasks(projectId: string, projectName: string, isArchived: boolean) {
  return async dispatch => {
    try {
      await axios.put('/tasks/archived', null, {
        params: {
          isArchived,
          projectName,
        }
      });

      dispatch(getTasks(projectId));
      dispatch({
        type: SET_SHOW_TOAST_EDIT,
      });

      setTimeout(() => {
        dispatch({
          type: UNSET_SHOW_TOAST,
        });
      }, configData.timeOutForToasterInSeconds);
    } catch (error) {
      console.log(error);
    }
  };
}
