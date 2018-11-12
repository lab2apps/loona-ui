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
                this.props.map ? 'l-search--bg-transparent' : ''
              }/>
            <Icon24Filter className={'l-filter-search'} onClick={this.props.showFilters}/>
          </React.Fragment>
        </FixedLayout>


        {
          !this.props.map &&
          <div style={{ padding: '60px 0 96px' }}>
            <SpacesList spaces={this.props.spaces}>
            </SpacesList>
          </div>
        }

        {
          this.props.map &&
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
                this.props.history.push('/all')
              }}
              selected={!this.props.map}>
              Списком
            </TabsItem>
            <TabsItem
              onClick={() => {
                this.props.history.push('/all?map=true')
              }}
              selected={this.props.map}>
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
