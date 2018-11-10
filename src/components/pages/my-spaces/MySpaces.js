import React from 'react';
import { withRouter } from 'react-router-dom';
import { PanelHeader, Div, Button, FixedLayout, Search, Tabs, TabsItem } from '@vkontakte/vkui';

import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import { SpaceListItem } from '../../spaces/space-list-item/SpaceListItem';

const SPACES_VIEW_TYPES = {
  LIST_VIEW: 'LIST',
  MAP_VIEW: 'MAP',
};

@withRouter
export class MySpaces extends React.PureComponent {

  state = {
    selectedSpacesViewType: SPACES_VIEW_TYPES.LIST_VIEW,
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

        <FixedLayout vertical="top">
          <Search/>
        </FixedLayout>

        <Div style={{ padding: '60px 0' }}>

          {
            (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW) &&
            <React.Fragment>
              <SpacesList>
              </SpacesList>
            </React.Fragment>
          }

          {
            (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW) &&
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
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.LIST_VIEW })
              }}
              selected={this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW}>
              Подписки
            </TabsItem>
            <TabsItem
              onClick={() => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.MAP_VIEW })
              }}
              selected={this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW}>
              Созданные мной
            </TabsItem>
          </Tabs>
        </FixedLayout>
      </React.Fragment>
    );
  };

}
