import React from 'react';

import { View, Panel } from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';

import { Dashboard } from '../dashboard/Dashboard';
import { EditSpace } from '../edit-space/EditSpace';
import { EditRoom } from '../edit-room/EditRoom';
import { Onboarding } from '../onboarding/Onboarding';
import { Room } from '../room/Room';
import { AllSpaces } from '../all-spaces/AllSpaces';
import { MySpaces } from '../my-spaces/MySpaces';

import './main.scss';
import { Space } from '../space/SpaceDetails';

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
    console.warn('pathname',this.props.location.pathname);

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

        {/* SPACES */}
        <Panel id='/all-spaces'>
          <AllSpaces/>
        </Panel>

        <Panel id='/my-spaces'>
          <MySpaces/>
        </Panel>

        <Panel id='/edit-space'>
          <EditSpace/>
        </Panel>

        <Panel id='/space-details'> {/* ?id=[spaceId] */}
          <Space/>
        </Panel>


        {/* ROOMS */}
        <Panel id='/edit-room'>
          <EditRoom/>
        </Panel>

        <Panel id='/room-details'> {/* ?id=[roomId] */}
          <Room/>
        </Panel>

      </View>
    );
  }
}
