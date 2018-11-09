import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Main } from './components/pages/main/Main';

import 'styles/app.scss';

export class App extends Component {
  render () {
    return (
      <Switch>
        <Route path='/' exact={ true } component={ Main }/>
      </Switch>
    );
  }
}
