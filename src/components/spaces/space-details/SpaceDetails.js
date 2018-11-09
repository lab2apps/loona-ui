import React from 'react';
import {
  Div, PanelHeader,
} from '@vkontakte/vkui';
import { RoomsList } from '../../rooms/rooms-list/RoomsList';

type SpaceDetailsProps = {}

export class SpaceDetails extends React.PureComponent<SpaceDetailsProps> {
  render () {
    return (
      <React.Fragment>
        <Div>
          Детали площадки
        </Div>

        <RoomsList>
        </RoomsList>
      </React.Fragment>
    );
  }
}
