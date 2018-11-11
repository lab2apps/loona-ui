import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FixedLayout, PanelHeader, Search, Tabs, TabsItem } from '@vkontakte/vkui';
import debounce from 'lodash/debounce';
import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import { getSpaces, querySpaces } from '../../../store/actions/spaceActions';
import { MapView } from '../../common/MapView';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';

const SPACES_VIEW_TYPES = {
  LIST_VIEW: 'LIST',
  MAP_VIEW: 'MAP',
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class AllSpaces extends React.PureComponent {

  state = {
    selectedSpacesViewType: SPACES_VIEW_TYPES.LIST_VIEW,
  };

  componentDidMount () {
    this.props.getSpaces();
  }

  onQueryChange = (queryString) => {
    this.props.querySpaces({
      queryString,
    });
  };

  mapSpaceToPoint (space) {
    return {
      name: space.name,
      coords: [space.latitude, space.longitude],
      id: space.uuid,
    }
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Все площадки
        </PanelHeader>

        <FixedLayout vertical="top">
          <React.Fragment>
            <Search
              onChange={debounce(this.onQueryChange, 300)}
              className={
                (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW) ? 'l-search--bg-transparent' : ''
              }/>
            <Icon24Filter className={'l-filter-search'} onClick={this.props.showFilters}/>
          </React.Fragment>
        </FixedLayout>


        {
          (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW) &&
          <div style={{ padding: '60px 0 96px' }}>
            <SpacesList spaces={this.props.spaces}>
            </SpacesList>
          </div>
        }

        {
          (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW) &&
          <React.Fragment>
            <div style={{ height: '100%', padding: '0 0 96px' }}>
              <MapView points={this.props.spaces.map(this.mapSpaceToPoint)}/>
            </div>
          </React.Fragment>
        }

        <FixedLayout vertical="bottom">
          <Tabs>
            <TabsItem
              onClick={() => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.LIST_VIEW });
              }}
              selected={this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW}>
              Списком
            </TabsItem>
            <TabsItem
              onClick={() => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.MAP_VIEW });
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

function mapStateToProps (state) {
  return state.spaces;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getSpaces, querySpaces }, dispatch);
}
