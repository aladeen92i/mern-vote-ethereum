import React, { Fragment } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import decode from 'jwt-decode';

// my own middlewarez
// import api from '../services/api';
import { store } from '../store/';
import {setCurrentUser, addError, setToken} from '../store/actions';
import RouteViews from './RouteViews';
import NavBar from './NavBar';
import { DrizzleProvider } from 'drizzle-react';
import { Drizzle, generateStore } from "drizzle";
import MyStringStore from "../contracts/MyStringStore.json";

if(localStorage.jwtToken) {
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



const App = () => (
    <DrizzleProvider options={options}>
    <Provider store={store}>
        <Router>
            <Fragment>
                <NavBar/>
                <RouteViews/>
            </Fragment>
     </Router>
    </Provider>
    </DrizzleProvider>
);

export default App;