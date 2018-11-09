import React from 'react';

import { View, Panel, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Link, withRouter } from 'react-router-dom';

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

    if (newState.activePanel !== state.activePanel) {
      return newState;
    }

    return null;
  }

  goToPanel = (panel) => {
    return () => {
      this.props.history.push(panel);
    };
  };

  render () {
    console.log(this.state.activePanel);

    if (this.state.activePanel === '/' || this.state.activePanel === '/my-spaces' || this.state.activePanel === '/edit-space') {
      const hasTabbar = this.state.activePanel !== '/edit-space';

      return (
        <Epic activeStory={ this.state.activePanel === '/edit-space' ? '/' : this.state.activePanel }

              tabbar={ hasTabbar && <Tabbar>
                <TabbarItem onClick={ this.goToPanel('/') }
                            selected={ this.state.activePanel === '/' }>
                  Все Площадки
                </TabbarItem>

                <TabbarItem onClick={ this.goToPanel('/my-spaces') }
                            selected={ this.state.activePanel === '/my-spaces' }>
                  Мои Площадки
                </TabbarItem>
              </Tabbar>
              }>

          <View id='/'
                activePanel={ this.state.activePanel }>
            <Panel id='/'>
              <AllSpaces/>
              <Link to={'/edit-space'}>go</Link>
            </Panel>

            <Panel id='/edit-space'>
              <EditSpace/>
              <Link to={'/space-details'}>go</Link>

            </Panel>
          </View>

          <View id='/my-spaces'
                activePanel={ '/my-spaces' }>
            <Panel id='/my-spaces'>
              <MySpaces/>
              <Link to={'/edit-space'}>go</Link>

            </Panel>
          </View>
        </Epic>
      );
    }

    return (
      <View id='main'
            activePanel={ this.state.activePanel }
            className='l-main'>
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


        { /* ROOMS */ }
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
