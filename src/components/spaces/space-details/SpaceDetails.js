import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Div,
  Button,
  Group,
  List,
  Cell,
  Tabs,
  TabsItem,
  InfoRow,
  CellButton,
} from '@vkontakte/vkui';
import { RoomsList } from '../../rooms/rooms-list/RoomsList';
import { removeSpace } from '../../../store/actions/spaceActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon24About from '@vkontakte/icons/dist/24/about';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Add from '@vkontakte/icons/dist/24/add';

const SPACE_DETAILS_TABS = {
  ALL_ROOMS: 'ALL_ROOMS',
  ABOUT_SPACE: 'ABOUT_SPACE',
};

type SpaceDetailsProps = {
  space: any;
}

@withRouter
@connect(null, mapDispatchToProps)
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

  remove = () => {
    this.props.removeSpace(this.props.space.uuid);
  };

  render () {
    return (
      <React.Fragment>

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

        <Group>
          <div className="l-detailed-place-image">
            <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>fake image</div>
          </div>

          <List>
            <Cell
              size="l"
              description="Арт-пространство"
              bottomContent={

                // FOR OWNER ONLY
                <div style={{ display: 'flex', paddingTop: '10px' }}>
                  <Button size="l" stretched style={{ marginRight: 8 }}
                          onClick={this.onMessageButtonClick}>Сообщение</Button>
                  <Button size="l" stretched level="secondary" onClick={this.onEditButtonClick}>Редактировать</Button>
                </div>

              }>
              Порт Севкабель
            </Cell>

            <Cell before={<Icon24Place/>}
                  expandable
                  onClick={() => this.setState({ activePanel: 'nothing' })}>
              Кожевенная линия, 40Д
            </Cell>
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
                <RoomsList>
                </RoomsList>

                <Cell>
                  <CellButton
                    align="center"
                    before={<Icon24Add/>}
                    onClick={this.onCreateRoomButtonClick}>
                    Добавить родственника
                  </CellButton>
                </Cell>
              </React.Fragment>
            }

            {
              (this.state.selectedTab === SPACE_DETAILS_TABS.ABOUT_SPACE) &&
              <React.Fragment>
                <Cell>
                  <InfoRow title="Описание площадки">
                    Культурный и деловой порт в Гавани В.О. Если чо, это гребанное многострочное поле
                  </InfoRow>
                </Cell>

                <Cell>
                  <InfoRow title="Телефон для связи">
                    +7 812 213-32-02
                  </InfoRow>
                </Cell>

                <Cell>
                  <InfoRow title="Дни работы площадки">
                    Ежедневно
                  </InfoRow>
                </Cell>

                <Cell>
                  <InfoRow title="Время работы площадки">
                    11:00 — 23:00
                  </InfoRow>
                </Cell>
              </React.Fragment>
            }
          </List>
        </Group>


        <pre>
          {JSON.stringify(this.props.space, null, 2)}
        </pre>


        <Button onClick={this.remove}>
          удалить
        </Button>

      </React.Fragment>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ removeSpace }, dispatch);
}
