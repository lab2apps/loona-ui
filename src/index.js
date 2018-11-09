import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { App } from './App';

import { configureStore } from './store/configureStore';

connect.send('VKWebAppInit', {});

const rootElement = document.getElementById('root');

const AppStore = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={ AppStore }>
        <HashRouter>
          <Component/>
        </HashRouter>
    </Provider>,
    rootElement,
  );
};

render(App);

if (module.hot) {
  module.hot.accept();

  const NextApp = require('./App').App;

  render(NextApp);
}

