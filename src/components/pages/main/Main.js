import React from 'react';

import { View, Panel } from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';

import { Dashboard } from '../dashboard/Dashboard';
import { EditSpace } from '../edit-space/EditSpace';
import { EditRoom } from '../edit-room/EditRoom';
import { Onboarding } from '../onboarding/Onboarding';

import './main.scss';

@withRouter
export class Main extends React.PureComponent {
  state = {};

  static getDerivedStateFromProps (props, state) {
    const newState = {
      activePanel: props.history.location.pathname,
    };

    console.log(props.history.location.pathname);

    if (newState.activePanel !== state.activePanel) {
      return newState;
    }

    return null;
  }

  render () {
    console.log(this.props.location.pathname);

    return (
      <View id='main'
            activePanel={ this.state.activePanel }
            className='l-main'>
        <Panel id='/'>
          <Dashboard/>
        </Panel>

        <Panel id='/onboarding'
               className='l-onboarding l-panel l-panel--full-height'>
          <Onboarding/>
        </Panel>

        <Panel id='/edit-space'>
          <EditSpace/>
        </Panel>

        <Panel id='/edit-room'>
          <EditRoom/>
        </Panel>
      </View>
    );
  }
}
