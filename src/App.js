import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { RootState } from './store/reducers/rootReducer';
import { getUserInfo } from './store/actions/vkActions';

import { Main } from './components/pages/main/Main';
import { AppRoute } from './containers/app-route/AppRoute';

import 'styles/app.scss';

@connect(mapStateToProps, mapDispatchToProps)
export class App extends Component {
  componentDidMount () {
    this.props.getUserInfo();
  }

  render () {
    return (
      <Switch>
        <AppRoute path='/' component={ Main }/>
      </Switch>
    );
  }
}


function mapStateToProps (state: RootState) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getUserInfo,
  }, dispatch);
}
