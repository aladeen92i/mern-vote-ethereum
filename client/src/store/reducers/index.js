import {combineReducers} from 'redux';
import { drizzleReducers } from 'drizzle';
import auth from './auth';
import error from './error';
import {polls, currentPoll} from './polls';


export default combineReducers({
    error,
    auth,
    polls,
    currentPoll
});