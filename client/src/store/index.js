import {createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import { generateContractsInitialState } from 'drizzle'
import { Drizzle, generateStore } from "drizzle";
import MyStringStore from "../contracts/MyStringStore.json";
//import drizzleOptions from './drizzleOptions'

const drizzleOptions = {
    contracts: [MyStringStore],
    web3: {
      fallback: {
        type: "ws",
        url: "ws://127.0.0.1:9545",
      },
    },
  };

const DEFAULT_STATE = {
    error: {message: null},
    contracts: generateContractsInitialState(drizzleOptions)
};

export const store = createStore(
    rootReducer,
    DEFAULT_STATE,
    compose(applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );