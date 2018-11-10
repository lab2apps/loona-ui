import React from 'react';
import { withRouter } from 'react-router-dom';
import { Div, FixedLayout, PanelHeader, Search, Tabs, TabsItem } from '@vkontakte/vkui';
import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import { MapView } from '../../common/MapView';

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
          <Search className={
            (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW) ? 'l-search--bg-transparent' : ''
          }/>
        </FixedLayout>


        {
          (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW) &&
          <div style={ { padding: '48px 0 96px'} }>
            <SpacesList>
            </SpacesList>
          </div>
        }

        {
          (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW) &&
          <React.Fragment>
            <div style={ { height: '100%', padding: '0 0 96px'} }>
              <MapView>
              </MapView>
            </div>
          </React.Fragment>
        }

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
