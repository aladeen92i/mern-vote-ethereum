import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import { Provider } from 'react-redux';
import { DrizzleProvider } from 'drizzle-react';
import { Drizzle, generateStore } from "drizzle";
import MyStringStore from "../contracts/MyStringStore.json";
import { store } from '../store';
import { setToken, setCurrentUser, addError } from '../store/actions';

import Auth from '../components/Auth';
import Poll from '../components/Poll';
import Polls from '../components/Polls';
import ErrorMessage from '../components/ErrorMessage';
import CreatePoll from '../components/CreatePoll';
//import Contract from '../components/Contract';

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}

const options = {
  contracts: [MyStringStore],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};

const drizzle = new Drizzle(options);

const UITest = props => (
  <DrizzleProvider options={options}>
  <Provider store={store}>
    <Fragment>
      <h1>UI Test Page</h1>

      <h2>Testing Error Component: </h2>
      <ErrorMessage />
      <hr />

      <h2>Testing Auth Component: </h2>
      <Auth />
      <hr />

      <h2>Testing Create Poll Component: </h2>
      <CreatePoll />
      <hr />

      <h2>Testing Polls Component: </h2>
      <Polls {...props} />
      <hr />

      <h2>Testing Poll Component: </h2>
      <Poll />
      <hr />
      <h2>Testing Drizzle contract Component: </h2>
      <hr />
    </Fragment>
  </Provider>
  </DrizzleProvider>
);

export default withRouter(UITest);