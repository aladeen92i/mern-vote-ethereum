import React from 'react';
import { render } from 'react-dom';


import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

class Wrapper extends React.Component {
    componentDidCatch(error, info) {
      // Do something useful with error like logging to error reporting system
      // then force reload (if that's what you want):
      window.location.reload(true);
    }
    render() {
      return (render(<App />, document.getElementById('root')))
    }
  }



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();
