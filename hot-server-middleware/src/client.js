/**
 * Created by sajjad on 3/14/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

function renderApp({ App }) {
  ReactDOM.hydrate(
    <App />,
    document.getElementById('root')
  );
}

window.onload = () => {
  renderApp({ App });
};

if (module.hot) {
  module.hot.accept(['./components/App'], () => {
    const NewApp = require('./components/App').default; // eslint-disable-line
    renderApp({
      App: NewApp
    });
  });
}
