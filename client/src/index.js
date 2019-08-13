import React from 'react';
import { render } from 'react-dom';
//import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
//import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// import "./assets/scss/mdb.scss"

render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

registerServiceWorker();
