import {createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import { generateContractsInitialState } from 'drizzle'
import { Drizzle, generateStore } from "drizzle";
import MyStringStore from "../contracts/MyStringStore.json";
//import drizzleOptions from './drizzleOptions'

const options = {
  contracts: [MyStringStore]
  };
  
  const drizzleStore = generateStore(options);
  const drizzle = new Drizzle(options, drizzleStore);

const DEFAULT_STATE = {
    error: {message: null},
    contracts: generateContractsInitialState(options)
};

export const store = createStore(
    rootReducer,
    DEFAULT_STATE,
    compose(applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );