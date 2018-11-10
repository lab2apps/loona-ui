import React from 'react';
import {
  List,
} from '@vkontakte/vkui';

import { RoomListItem } from '../room-list-item/RoomListItem';

type RoomsListProps = {
  rooms: any[]
}

export class RoomsList extends React.PureComponent<RoomsListProps> {
  render () {
    return (
      <List>
        { this.props.rooms.map((item, i) => {
          return <RoomListItem key={ i } room={ item }/>;
        }) }
      </List>
    );
  }
}
