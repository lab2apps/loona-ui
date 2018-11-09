import React from 'react';
import {
  Div, PanelHeader,
} from '@vkontakte/vkui';
import { SpacesList } from '../../spaces/spaces-list/SpacesList';

type RoomDetailsProps = {
}

export class RoomDetails extends React.PureComponent<RoomDetailsProps> {
  render () {
    return (
      <Div>
        Детали помещения
      </Div>
    );
  }
}
