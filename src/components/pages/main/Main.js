import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Panel } from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';

import type { RootState } from '../../../store/reducers/rootReducer';

import { getUserInfo } from '../../../store/actions/vkActions';

import { Dashboard } from '../dashboard/Dashboard';

import './main.scss';

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class Main extends React.PureComponent {
  state = {};

  static getDerivedStateFromProps (props, state) {
    const newState = {
      activePanel: props.location.pathname,
    };

    if (newState.activePanel !== state.activePanel) {
      return newState;
    }

    return null;
  }

  componentDidMount () {
    this.props.getUserInfo();
  }

  render () {
    return (
      <View id='main'
            activePanel={ this.state.activePanel }
            className='l-main'>
        <Panel id='/'>
          <Dashboard/>
        </Panel>
      </View>
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
