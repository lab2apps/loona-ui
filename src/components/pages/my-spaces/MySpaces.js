import React from 'react';
import { withRouter } from 'react-router-dom';
import { PanelHeader, Div, Button, FixedLayout, Search, Tabs, TabsItem } from '@vkontakte/vkui';

import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import { bindActionCreators } from 'redux';
import { getMySpaces } from '../../../store/actions/spaceActions';
import connect from 'react-redux/es/connect/connect';

const SPACES_VIEW_TYPES = {
  LIST_VIEW: 'LIST',
  MAP_VIEW: 'MAP',
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class MySpaces extends React.PureComponent {

  state = {
    selectedSpacesViewType: SPACES_VIEW_TYPES.LIST_VIEW,
  };

  componentDidMount () {
    this.props.getMySpaces();
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

        <Div style={ { padding: '60px 0' } }>

          {
            (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW) &&
            <React.Fragment>
              <SpacesList spaces={ this.props.spaces }>
              </SpacesList>
            </React.Fragment>
          }

          {
            (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW) &&
            <React.Fragment>
              <SpacesList spaces={ this.props.spaces }>
              </SpacesList>
              <Button size='xl'
                      onClick={ () => {
                        this.props.history.push(
                          '/my/edit-space');
                      } }>
                Создать площадку
              </Button>
            </React.Fragment>
          }

        </Div>

        <FixedLayout vertical="bottom">
          <Tabs>
            <TabsItem
              onClick={ () => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.LIST_VIEW });
              } }
              selected={ this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.LIST_VIEW }>
              Подписки
            </TabsItem>
            <TabsItem
              onClick={ () => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.MAP_VIEW });
              } }
              selected={ this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MAP_VIEW }>
              Созданные мной
            </TabsItem>
          </Tabs>
        </FixedLayout>
      </React.Fragment>
    );
  };
}

function mapStateToProps (state) {
  return state.mySpaces;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getMySpaces }, dispatch);
}
