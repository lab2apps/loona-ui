import React from 'react';
import {
  Div, PanelHeader,
} from '@vkontakte/vkui';
import { SpacesList } from '../../spaces/spaces-list/SpacesList';
import { RoomDetails } from '../../rooms/room-details/RoomDetails';

type RoomDetailsProps = {
}

export class Room extends React.PureComponent<RoomDetailsProps> {
  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Детали помещения
        </PanelHeader>

        <RoomDetails>
        </RoomDetails>
      </React.Fragment>
    );
  }
}
