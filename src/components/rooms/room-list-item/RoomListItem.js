import React from 'react';
import {
  Div,
} from '@vkontakte/vkui';
import { Link } from 'react-router-dom';

type RoomData = {
  id: string,
  name: string,
}

type RoomListItemProps = {
  room: RoomData
}

export class RoomListItem extends React.PureComponent<RoomListItemProps> {
  render () {
    return (
      <Div>
        <Link to={ `/room-details?id=${ this.props.room.id }` }>Room list item</Link>
      </Div>
    );
  }
}
