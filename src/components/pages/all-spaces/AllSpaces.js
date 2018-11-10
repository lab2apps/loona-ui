import React from 'react';
import { withRouter } from 'react-router-dom';
import { Div, FixedLayout, PanelHeader, Search, Tabs, TabsItem } from '@vkontakte/vkui';
import { SpacesList } from '../../spaces/spaces-list/SpacesList';

const SPACES_VIEW_TYPES = {
  LIST_VIEW: 'LIST',
  MAP_VIEW: 'MAP',
};

@withRouter
export class AllSpaces extends React.PureComponent {

  state = {
    selectedSpacesViewType: SPACES_VIEW_TYPES.LIST_VIEW,
  };

  componentDidMount () {
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Все площадки
        </PanelHeader>

        <FixedLayout vertical="top">
          <Search/>
        </FixedLayout>

        <Div style={ {padding: '60px 0'} }>
          {
            this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW
              ? <SpacesList>
              </SpacesList>
              : <div>Map view</div>
          }
        </Div>

        <FixedLayout vertical="bottom">
          <Tabs>
            <TabsItem
              onClick={() => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.LIST_VIEW })
              }}
              selected={this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW}>
              Списком
            </TabsItem>
            <TabsItem
              onClick={() => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.MAP_VIEW })
              }}
              selected={this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW}>
              На карте
            </TabsItem>
          </Tabs>
        </FixedLayout>
      </React.Fragment>
    );
  };

}
