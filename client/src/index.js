import React from 'react';
import { render } from 'react-dom';
import { DrizzleProvider, DrizzleContext } from 'drizzle-react';
import { Drizzle, generateStore } from 'drizzle';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
//import { MyStringStore }  from './contracts/MyStringStore';
const options = { contracts: [] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

render(<DrizzleProvider options={options}><App /></DrizzleProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();
