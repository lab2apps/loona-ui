import React from 'react';
import { withRouter } from 'react-router-dom';
import { PanelHeader, Div, Button, FixedLayout, Search, Tabs, TabsItem } from '@vkontakte/vkui';

import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import { bindActionCreators } from 'redux';
import { getMySpaces } from '../../../store/actions/spaceActions';
import connect from 'react-redux/es/connect/connect';

const SPACES_VIEW_TYPES = {
  SUBSCRIPTIONS: 'LIST',
  MY_SPACES: 'MAP',
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class MySpaces extends React.PureComponent {

  state = {
    selectedSpacesViewType: SPACES_VIEW_TYPES.SUBSCRIPTIONS,
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

        <div style={ { padding: '0 0 96px'} }>
          {
            (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.SUBSCRIPTIONS) &&
            <React.Fragment>
              <SpacesList spaces={ this.props.spaces }>
              </SpacesList>
            </React.Fragment>
          }

          {
            (this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MY_SPACES) &&
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
        </div>

        <FixedLayout vertical="bottom">
          <Tabs>
            <TabsItem
              onClick={ () => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.SUBSCRIPTIONS });
              } }
              selected={ this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.SUBSCRIPTIONS }>
              Подписки
            </TabsItem>

            <TabsItem
              onClick={ () => {
                this.setState({ selectedSpacesViewType: SPACES_VIEW_TYPES.MY_SPACES });
              } }
              selected={ this.state.selectedSpacesViewType === SPACES_VIEW_TYPES.MY_SPACES }>
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
