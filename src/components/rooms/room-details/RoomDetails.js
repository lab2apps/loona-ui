import React from 'react';
import {
  Button,
  Cell, CellButton,
  Div, Group, InfoRow, List, PanelHeader, Tabs, TabsItem,
} from '@vkontakte/vkui';
import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import Icon24About from '@vkontakte/icons/dist/24/about';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import { RoomsList } from '../rooms-list/RoomsList';
import Icon24Add from '@vkontakte/icons/dist/24/add';

type RoomInfo = {}

type RoomDetailsProps = {
  room: RoomInfo
}

export class RoomDetails extends React.PureComponent<RoomDetailsProps> {
  render () {
    return (
      <React.Fragment>

        <div className="l-detailed-place-image">
          <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>fake image</div>
        </div>

        <Group>
          <List>
            <Cell
              size="l"
              description="Место"
              bottomContent={

                // FOR OWNER ONLY
                <div style={{ display: 'flex', paddingTop: '10px' }}>
                  <Button size="l" stretched style={{ marginRight: 8 }}
                          onClick={this.onMessageButtonClick}>Бронировать</Button>
                  <Button size="l" stretched level="secondary" onClick={this.onEditButtonClick}>На просмотр</Button>
                </div>

              }>
              Киоск на фуд-корте
            </Cell>
          </List>
        </Group>

        <Group>
          <List>
            <Cell>
              <InfoRow title="Описание места">
                Уютное место на фудкорте в Севкабеле, предназначенное для угощения гостей
              </InfoRow>
            </Cell>

            <Cell>
              <InfoRow title="Метраж">
                30m
              </InfoRow>
            </Cell>

            <Cell>
              <InfoRow title="Дополнительные удобства">
                Wi-Fi, Кофемашина
              </InfoRow>
            </Cell>
          </List>
        </Group>

        <Group description="description">

          hello
        </Group>

        <Div top="sdfvsdfv"></Div>


        <pre>
          {JSON.stringify(this.props.room, null, 2)}
        </pre>

      </React.Fragment>
    );
  }
}
