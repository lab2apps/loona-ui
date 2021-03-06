import React from 'react';
import { withRouter } from 'react-router-dom';
import { PanelHeader, List, FixedLayout, Tabs, TabsItem, CellButton, Cell } from '@vkontakte/vkui';

import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import { bindActionCreators } from 'redux';
import { getMySpaces } from '../../../store/actions/spaceActions';
import connect from 'react-redux/es/connect/connect';
import Icon24Add from '@vkontakte/icons/dist/24/add';

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

        <div style={ { padding: '0 0 96px' } }>
          {
            (!this.props.my) &&
            <React.Fragment>
              <SpacesList spaces={ this.props.spaces.filter(space => !space.mySpace) }>
              </SpacesList>
            </React.Fragment>
          }

          {
            (this.props.my) &&
            <React.Fragment>
              <List>
                <Cell>
                  <CellButton
                    align="center"
                    before={ <Icon24Add/> }
                    onClick={ () => {
                      this.props.history.push(
                        '/my/edit-space');
                    } }
                  >
                    Создать площадку

                  </CellButton>
                </Cell>
              </List>

              <SpacesList spaces={ this.props.spaces.filter(space => space.mySpace) }>
              </SpacesList>
            </React.Fragment>
          }
        </div>

        <FixedLayout vertical="bottom">
          <Tabs>
            <TabsItem
              onClick={ () => {
                this.props.history.push('/my');
              } }
              selected={ !this.props.my }>
              Подписки
            </TabsItem>

            <TabsItem
              onClick={ () => {
                this.props.history.push('/my?my=true');
              } }
              selected={ this.props.my }>
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
