import React from 'react';
import { withRouter } from 'react-router-dom';
import { PanelHeader, Div, Button, FixedLayout, Search, Tabs, TabsItem } from '@vkontakte/vkui';

import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import { SpaceListItem } from '../../spaces/space-list-item/SpaceListItem';

const SPACES_VIEW_TYPES = {
  SUBSCRIPTIONS: 'LIST',
  MY_SPACES: 'MAP',
};

@withRouter
export class MySpaces extends React.PureComponent {

  state = {
    selectedSpacesViewType: SPACES_VIEW_TYPES.SUBSCRIPTIONS,
  };

  componentDidMount () {
    console.warn('spaceId', this.spaceId);
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Мои площадки
        </PanelHeader>

        <Div style={{ padding: '0 0 60px' }}>

          {
            (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.SUBSCRIPTIONS) &&
            <React.Fragment>
              <SpacesList>
              </SpacesList>
            </React.Fragment>
          }

          {
            (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MY_SPACES) &&
            <React.Fragment>
              <SpacesList>
              </SpacesList>
              <Button size='xl'
                      onClick={() => {
                        this.props.history.push(
                          '/my/edit-space');
                      }}>
                Создать площадку
              </Button>
            </React.Fragment>
          }
        </Div>

        <FixedLayout vertical="bottom">
          <Tabs>
            <TabsItem
              onClick={() => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.SUBSCRIPTIONS })
              }}
              selected={this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.SUBSCRIPTIONS}>
              Подписки
            </TabsItem>
            <TabsItem
              onClick={() => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.MY_SPACES })
              }}
              selected={this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MY_SPACES}>
              Созданные мной
            </TabsItem>
          </Tabs>
        </FixedLayout>
      </React.Fragment>
    );
  };

}
