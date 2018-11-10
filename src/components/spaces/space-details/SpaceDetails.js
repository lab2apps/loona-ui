import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Group,
  List,
  Cell,
  Tabs,
  TabsItem,
  InfoRow,
  Gallery,
  CellButton,
} from '@vkontakte/vkui';
import { RoomsList } from '../../rooms/rooms-list/RoomsList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon24About from '@vkontakte/icons/dist/24/about';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import { getRooms } from '../../../store/actions/roomActions';
import { environment } from '../../../config/environment';
import { WEEKDAYS } from '../../../contants/WEEKDAYS';

const SPACE_DETAILS_TABS = {
  ALL_ROOMS: 'ALL_ROOMS',
  ABOUT_SPACE: 'ABOUT_SPACE',
};

type SpaceDetailsProps = {
  space: any;
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class SpaceDetails extends React.PureComponent<SpaceDetailsProps> {

  state = {
    selectedTab: SPACE_DETAILS_TABS.ALL_ROOMS,
  };

  onEditButtonClick = () => {
    this.props.history.push(`/my/edit-space?spaceId=${ this.props.space.uuid }`);
  };

  onCreateRoomButtonClick = () => {
    this.props.history.push(`/my/edit-room?spaceId=${ this.props.space.uuid }`);
  };

  onMessageButtonClick = () => {
    console.warn('NOT IMPLEMENTED');
  };

  componentDidMount () {
    this.props.getRooms({
      spaceId: this.props.space.uuid,
    });
  }

  addToFavorites = () => {

  };

  render () {
    return (
      <React.Fragment>

        { this.props.space.moderated &&
        <Group>
          <div className='l-notification'>
            <div className="l-notification__icon" style={ { color: 'var(--yellow)' } }>
              <Icon24About/>
            </div>
            <div className="l-notification__content l-text-gray">
              Площадка находится на модерации. Пока модерация не пройдена, вам не доступно редактирование деталей
              площадки
            </div>

          </div>
        </Group>
        }


        <Group>
          { this.props.space.imageUrls.length > 0 && (
            <Gallery style={ { height: 150 } }
                     bullets={ 'dark' }>
              { this.props.space.imageUrls.map((image) => {
                return <img src={ `${environment.apiUrl}/image/${image}` }/>;
              }) }
            </Gallery>
          ) }

          <List>
            <Cell
              size="l"
              description={ this.props.space.type }
              bottomContent={

                // FOR OWNER ONLY
                <div style={ { display: 'flex', paddingTop: '10px' } }>
                  <Button size="l" stretched style={ { marginRight: 8 } }
                          onClick={ this.onMessageButtonClick }>Сообщение</Button>
                  { this.props.space.mySpace ? (<Button size="l" stretched level="secondary"
                                                        onClick={ this.onEditButtonClick }>Изменить</Button>) : (
                    <Button size="l" stretched level="secondary"
                            onClick={ this.addToFavorites }>В избранное</Button>
                  ) }

                </div>

              }>
              { this.props.space.name }
            </Cell>

            { this.props.space.address &&
            <Cell before={ <Icon24Place/> }
                  expandable
                  onClick={ () => this.setState({ activePanel: 'nothing' }) }>
              { this.props.space.address }
            </Cell>
            }
          </List>
        </Group>

        <Group>
          <List>
            <Cell size="l">
              <Tabs type="buttons">
                <TabsItem
                  onClick={ () => this.setState({ selectedTab: SPACE_DETAILS_TABS.ALL_ROOMS }) }
                  selected={ this.state.selectedTab === SPACE_DETAILS_TABS.ALL_ROOMS }
                >
                  Список мест
                </TabsItem>
                <TabsItem
                  onClick={ () => this.setState({ selectedTab: SPACE_DETAILS_TABS.ABOUT_SPACE }) }
                  selected={ this.state.selectedTab === SPACE_DETAILS_TABS.ABOUT_SPACE }
                >
                  О площадке
                </TabsItem>
              </Tabs>
            </Cell>

            {
              (this.state.selectedTab === SPACE_DETAILS_TABS.ALL_ROOMS) &&

              <React.Fragment>
                { this.props.rooms.rooms && <RoomsList rooms={ this.props.rooms.rooms }/> }

                <Cell>
                  <CellButton
                    align="center"
                    before={ <Icon24Add/> }
                    onClick={ this.onCreateRoomButtonClick }>
                    Добавить место
                  </CellButton>
                </Cell>
              </React.Fragment>
            }

            {
              (this.state.selectedTab === SPACE_DETAILS_TABS.ABOUT_SPACE) &&
              <React.Fragment>
                { this.props.space.description && (
                  <Cell>
                    <InfoRow title="Описание площадки">
                      { this.props.space.description }
                    </InfoRow>
                  </Cell>
                ) }

                { this.props.space.phone && (
                  <Cell>
                    <InfoRow title="Телефон для связи">
                      { this.props.space.phone }
                    </InfoRow>
                  </Cell>
                ) }

                <Cell>
                  <InfoRow title="Дни работы площадки">
                    { this.props.space.workDays.length === 7 ? 'Eжедневно' : this.props.space.workDays.map(item => WEEKDAYS[item]).join(',') }
                  </InfoRow>
                </Cell>

                <Cell>
                  <InfoRow title="Время работы площадки">
                    { this.props.space.startWorkTime } — { this.props.space.endWorkTime }
                  </InfoRow>
                </Cell>
              </React.Fragment>
            }
          </List>
        </Group>
      </React.Fragment>
    );
  }
}

function mapStateToProps (state) {
  return {
    rooms: state.rooms,
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getRooms }, dispatch);
}

