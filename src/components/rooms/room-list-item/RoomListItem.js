import React from 'react';
import {
  Avatar,
  Cell,
} from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';
import { environment } from '../../../config/environment';

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
    this.props.history.push(`/${this.props.location.pathname.split('/')[1]}/room-details?id=${ this.props.room.uuid }`);
  };

  render () {
    return (
      <Cell before={ <Avatar type={'app'} size={50} src={
        this.props.room.imageUrls.length > 0 ? `${environment.apiUrl}/image/${this.props.room.imageUrls[0]}` : null
      }/> }
            onClick={ this.go }
            indicator={this.props.room.myRent && <div className='l-indicator--rented'>арендую</div>}
            description={ this.props.room.type }>
        { this.props.room.name }
      </Cell>
    );
  }
}
