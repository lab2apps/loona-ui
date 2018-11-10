import React from 'react';
import {
  Avatar,
  Cell,
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
  go = () => {
    this.props.history.push(`/${this.props.location.pathname.split('/')[1]}/room-details?id=${ this.props.room.id }`);
  };

  render () {
    return (
      <Cell before={ <Avatar type={'app'} size={50}/> }
            onClick={ this.go }
            description={ this.props.room.type }>
        { this.props.room.name }
      </Cell>
    );
  }
}
