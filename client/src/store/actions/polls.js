import {SET_POLLS, SET_CURRENT_POLL} from '../actionTypes';
import {addError, removeError} from './error';
import api from '../../services/api';
//import { BrowserHistory } from 'react-router';

export const setPolls = polls => ({
    type: SET_POLLS,
    polls
});

export const setCurrentPoll = poll => ({
    type: SET_CURRENT_POLL,
    poll
});

export const getPolls = () => {
    return async dispatch => {
        try {
            const polls = await api.call('get', 'polls');
            dispatch(setPolls(polls));
            dispatch(removeError());
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}
// more like get last polls but whatever >.<
export const getSlicedPolls = () => {
    return async dispatch => {
        try {
            const polls = await api.call('get', 'polls');
            console.log("ceci est la taille de polls : " + polls.length);
            const slicedPolls = polls.slice((polls.length - 5),polls.length);
            dispatch(setPolls(slicedPolls));
            dispatch(removeError());
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}

// export const sortPolls = () => { // TODO or to remove
//     return async dispatch => {
//         try {
//             const polls = await api.call('get', 'polls');
//         }catch(err){
//             const error = err.response.data;
//             dispatch(addError(error.message));
//         }
//     }
// }

export const getUserPolls = () => {
    return async dispatch => {
        try {
            const polls = await api.call('get', 'polls/user');
            dispatch(setPolls(polls));
            dispatch(removeError());
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}

export const createPoll = data => {
    return async dispatch => {
        try {
            const poll = await api.call('post', 'polls', data);
            dispatch(setCurrentPoll(poll));
            dispatch(removeError());
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}

export const getCurrentPoll = path => {
    return async dispatch => {
      try {
        const poll = await api.call('get', `polls/${path}`);
        dispatch(setCurrentPoll(poll));
        dispatch(removeError());
      } catch (err) {
        const  error  = err.response.data;
        dispatch(addError(error));
      }
    }
  };

export const vote = (path, data) => {
    return async dispatch => {
        try {
            const poll = await api.call('post', `polls/${path}`, data);
            dispatch(setCurrentPoll(poll));
            dispatch(removeError());
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}

export const deletePoll = (id) => {
    return async dispatch => {
        try {
            const poll = await api.call('delete', `polls/${id}`);
            dispatch(setCurrentPoll(poll));
            dispatch(removeError());
            
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}