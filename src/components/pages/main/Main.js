import React from 'react';

import { View, Panel, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';

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
    let newActiveStory    = props.history.location.pathname.split('/')[1];
    let changeActiveStory = false;

    if (['all', 'my'].includes(newActiveStory)) {
      if (newActiveStory !== state.activeStory) {
        changeActiveStory = true;
      }
    }

    const newState = {
      activePanel: props.history.location.pathname,
      activeStory: changeActiveStory ? '/' + newActiveStory : state.activeStory,
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
    const hasTabbar = !['/my/edit-space'].includes(this.state.activePanel);

    return (
      <Epic activeStory={ this.state.activeStory }
            tabbar={ hasTabbar ? <Tabbar>
              <TabbarItem onClick={ this.goToPanel('/all') }
                          selected={ this.state.activeStory === '/all' }>
                Все Площадки
              </TabbarItem>

              <TabbarItem onClick={ this.goToPanel('/my') }
                          selected={ this.state.activeStory === '/my' }>
                Мои Площадки
              </TabbarItem>
            </Tabbar>
            : null}>

        <View id='/all'
              activePanel={ this.state.activePanel }>
          <Panel id='/all'>
            <AllSpaces/>
          </Panel>

          <Panel id='/all/space-details'>
            <Space/>
          </Panel>

          <Panel id='/all/room-details'>
            <Room/>
          </Panel>
        </View>

        <View id='/my'
              activePanel={ this.state.activePanel }>
          <Panel id='/my'>
            <MySpaces/>
          </Panel>

          <Panel id='/my/space-details'>
            <Space/>
          </Panel>

          <Panel id='/my/room-details'>
            <Room/>
          </Panel>

          <Panel id='/my/edit-space' className='l-panel l-panel--no-tabbar'>
            <EditSpace/>
          </Panel>
        </View>
      </Epic>
    );
  }
}
