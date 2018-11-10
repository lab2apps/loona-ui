import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { ScrollToTop } from './components/common/ScrollToTop';

import { configureStore } from './store/configureStore';

connect.send('VKWebAppInit', {});

const rootElement = document.getElementById('root');
const AppStore = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={ AppStore }>
        <BrowserRouter>
          <ScrollToTop>
            <Component/>
          </ScrollToTop>
        </BrowserRouter>
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

