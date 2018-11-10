import React from 'react';
import { withRouter } from 'react-router-dom';
import { Div, FixedLayout, PanelHeader, Search, Tabs, TabsItem } from '@vkontakte/vkui';
import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import { getSpaces } from '../../../store/actions/spaceActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Все площадки
        </PanelHeader>

        <FixedLayout vertical="top">
          <Search/>
        </FixedLayout>

        <Div style={ { padding: '60px 0' } }>
          {
            this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW
              ? <SpacesList spaces={ this.props.spaces }>
              </SpacesList>
              : <div>Map view</div>
          }
        </Div>

        <FixedLayout vertical="bottom">
          <Tabs>
            <TabsItem
              onClick={ () => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.LIST_VIEW });
              } }
              selected={ this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW }>
              Списком
            </TabsItem>
            <TabsItem
              onClick={ () => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.MAP_VIEW });
              } }
              selected={ this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW }>
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
  return bindActionCreators({ getSpaces }, dispatch);
}
