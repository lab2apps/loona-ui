import React from 'react';
import {
  Div,
} from '@vkontakte/vkui';
import { Link, withRouter } from 'react-router-dom';

type RoomData = {
  id: string,
  name: string,
}

type RoomListItemProps = {
  room: RoomData
}

@withRouter
export class RoomListItem extends React.PureComponent<RoomListItemProps> {
  render () {
    return (
      <Div>
        <Link to={ `/${this.props.location.pathname.split('/')[1]}/room-details?id=${ this.props.room.id }` }>Room list item</Link>
      </Div>
    );
  }
}
