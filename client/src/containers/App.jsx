import React, {Component} from 'react';
import {Provider} from 'react-redux';

// my own middlewarez
import api from '../services/api';
import {store} from '../store';


//const App = () => <div>App works</div> ;

const App = () => (
    <Provider store={store}>
        <div>App worksaa</div>
    </Provider>
);

export default App;