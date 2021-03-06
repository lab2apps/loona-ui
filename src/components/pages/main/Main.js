import React from 'react';

import { View, Panel, Epic, Tabbar, TabbarItem, ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { EditSpace } from '../edit-space/EditSpace';
import { Room } from '../room/Room';
import { AllSpaces } from '../all-spaces/AllSpaces';
import { MySpaces } from '../my-spaces/MySpaces';
import { Space } from '../space/Space';
import { EditRoom } from '../edit-room/EditRoom';
import { Booking } from '../booking/Booking';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';

import './main.scss';
import { SendMessage } from '../send-message/SendMessage';
import { Filter } from '../filter/Filter';
import { Notifications } from '../notifications/Notifications';
import { Additional } from '../../additional/Additional';

@withRouter
export class Main extends React.PureComponent {
  state = {
    showFilters: false,
  };

  static getDerivedStateFromProps (props, state) {
    let newActiveStory    = props.history.location.pathname.split('/')[1];
    let changeActiveStory = false;

    if (['all', 'my', 'notifications', 'additional'].includes(newActiveStory)) {
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
    const hasTabbar = !['/my/edit-space', '/my/edit-room', '/my/book-room'].includes(this.state.activePanel);

    const { map, my } = queryString.parse(this.props.location.search);

    return (
      <Epic activeStory={this.state.activeStory}
            tabbar={
              <Tabbar className={hasTabbar ? '' : 'l-hidden'}>
                <TabbarItem onClick={this.goToPanel('/all')}
                            selected={this.state.activeStory === '/all'}>
                  <Icon28Newsfeed className={'l-icon--24'}/>
                </TabbarItem>

                <TabbarItem onClick={this.goToPanel('/my')}
                            selected={this.state.activeStory === '/my'}>
                  <Icon24FavoriteOutline/>
                </TabbarItem>

                <TabbarItem onClick={this.goToPanel('/notifications')}
                            selected={this.state.activeStory === '/notifications'}>
                  <Icon28Notifications className={'l-icon--24'}/>
                </TabbarItem>

                <TabbarItem onClick={this.goToPanel('/additional')}
                            selected={this.state.activeStory === '/additional'}>
                  <Icon28Menu className={'l-icon--24'}/>
                </TabbarItem>
              </Tabbar>
            }
      >
        <View id='/all'
              popout={this.state.showFilters && <Filter onSubmit={() => {
                this.setState({ showFilters: false })
              }}/>}
              activePanel={this.state.activePanel}>
          <Panel id='/all' className="l-panel--full-height">
            <AllSpaces
              map={map}
              showFilters={() => {
                this.setState({ showFilters: true })
              }}/>
          </Panel>

          <Panel id='/all/space-details'>
            <Space/>
          </Panel>

          <Panel id='/all/room-details'>
            <Room/>
          </Panel>
        </View>

        <View id='/my'
              activePanel={this.state.activePanel}>
          <Panel id='/my' className="l-panel--full-height">
            <MySpaces my={my}/>
          </Panel>

          <Panel id='/my/space-details'>
            <Space/>
          </Panel>

          <Panel id='/my/room-details'>
            <Room/>
          </Panel>

          <Panel id='/my/send-message'>
            <SendMessage/>
          </Panel>

          <Panel id='/my/edit-space' className='l-panel l-panel--no-tabbar'>
            <EditSpace/>
          </Panel>

          <Panel id='/my/edit-room' className='l-panel l-panel--no-tabbar'>
            <EditRoom/>
          </Panel>

          <Panel id='/my/book-room' className='l-panel l-panel--no-tabbar'>
            <Booking/>
          </Panel>
        </View>

        <View id='/notifications'
              activePanel={this.state.activePanel}>
          <Panel id='/notifications'>
            <Notifications/>
          </Panel>
        </View>

        <View id='/additional'
              activePanel={this.state.activePanel}>
          <Panel id='/additional'>
            <Additional/>
          </Panel>
        </View>
      </Epic>
    );
  }
}
