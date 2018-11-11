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
import { SPACE_TYPES } from '../../../contants/SPACE_TYPES';
import axios from 'axios';

const SPACE_DETAILS_TABS = {
  ALL_ROOMS: 'ALL_ROOMS',
  ABOUT_SPACE: 'ABOUT_SPACE',
};

type SpaceDetailsProps = {
  space: any;
  onLike: () => void;
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
    this.props.history.push(`/my/send-message?spaceId=${ this.props.space.uuid }`);
  };

  componentDidMount () {
    this.props.getRooms({
      spaceId: this.props.space.uuid,
    });
  }

  addToFavorites = () => {
    let promise;
    if (this.props.space.myLike)  {
      promise = axios.delete(`${environment.apiUrl}/api/space/${this.props.space.uuid}/favorite`);
    } else {
      promise = axios.post(`${environment.apiUrl}/api/space/${this.props.space.uuid}/favorite`);
    }

    promise.then(() => {
      this.props.onLike();
    });
  };

  sendMessage = () => {
    window.location.replace('https://vk.com/im?sel=' + this.props.space.userId)
  };

  render () {
    return (
      <React.Fragment>

        {this.props.space.moderated &&
        <Group>
          <div className='l-notification'>
            <div className="l-notification__icon" style={{ color: 'var(--yellow)' }}>
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
          {this.props.space.imageUrls.length > 0 && (
            <Gallery style={{ height: 150 }}
                     bullets={'dark'}>
              {this.props.space.imageUrls.map((image) => {
                return <img src={`${environment.apiUrl}/image/${image}`} alt="space pics"/>;
              })}
            </Gallery>
          )}

          <List>
            <Cell
              size="l"
              description={SPACE_TYPES[this.props.space.type]}
              bottomContent={

                // FOR OWNER ONLY
                <div style={{ display: 'flex', paddingTop: '10px' }}>

                  {!this.props.space.mySpace && (<Button size="l" stretched style={{ marginRight: 8 }}
                                                         onClick={this.sendMessage}>Связаться</Button>)}


                  {this.props.space.mySpace && (<Button size="l" stretched style={{ marginRight: 8 }}
                                                        onClick={this.onMessageButtonClick}>Рассылка</Button>)}


                  {this.props.space.mySpace ? (<Button size="l" stretched level="secondary"
                                                       onClick={this.onEditButtonClick}>Редактировать</Button>) : (
                   <React.Fragment>
                     {this.props.space.myLike && (
                       <Button size="l" stretched level="secondary"
                               onClick={this.addToFavorites}>Отписаться</Button>
                     ) }

                     {!this.props.space.myLike && (
                       <Button size="l" stretched level="commerce"
                                   onClick={this.addToFavorites}>В избранное</Button>
                     ) }

                   </React.Fragment>
                  )}

                </div>

              }>
              {this.props.space.name}
            </Cell>

            {this.props.space.address &&
            <Cell before={<Icon24Place/>}
                  expandable
                  onClick={() => this.setState({ activePanel: 'nothing' })}>
              {this.props.space.address}
            </Cell>
            }
          </List>
        </Group>

        <Group>
          <List>
            <Cell size="l">
              <Tabs type="buttons">
                <TabsItem
                  onClick={() => this.setState({ selectedTab: SPACE_DETAILS_TABS.ALL_ROOMS })}
                  selected={this.state.selectedTab === SPACE_DETAILS_TABS.ALL_ROOMS}
                >
                  Список мест
                </TabsItem>
                <TabsItem
                  onClick={() => this.setState({ selectedTab: SPACE_DETAILS_TABS.ABOUT_SPACE })}
                  selected={this.state.selectedTab === SPACE_DETAILS_TABS.ABOUT_SPACE}
                >
                  О площадке
                </TabsItem>
              </Tabs>
            </Cell>

            {
              (this.state.selectedTab === SPACE_DETAILS_TABS.ALL_ROOMS) &&

              <React.Fragment>
                {this.props.rooms.rooms && <RoomsList rooms={this.props.rooms.rooms}/>}

                {this.props.space.mySpace && (
                  <Cell>
                    <CellButton
                      align="center"
                      before={<Icon24Add/>}
                      onClick={this.onCreateRoomButtonClick}>
                      Добавить место
                    </CellButton>
                  </Cell>
                )}
              </React.Fragment>
            }

            {
              (this.state.selectedTab === SPACE_DETAILS_TABS.ABOUT_SPACE) &&
              <React.Fragment>
                {this.props.space.description && (
                  <Cell>
                    <InfoRow title="Описание площадки">
                      {this.props.space.description}
                    </InfoRow>
                  </Cell>
                )}

                {this.props.space.phone && (
                  <Cell>
                    <InfoRow title="Телефон для связи">
                      {this.props.space.phone}
                    </InfoRow>
                  </Cell>
                )}

                <Cell>
                  <InfoRow title="Дни работы площадки">
                    {this.props.space.workDays.length === 7 ? 'Eжедневно' : this.props.space.workDays.map(
                      item => WEEKDAYS[item]).join(', ')}
                  </InfoRow>
                </Cell>

                <Cell>
                  <InfoRow title="Время работы площадки">
                    {this.props.space.startWorkTime} — {this.props.space.endWorkTime}
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

