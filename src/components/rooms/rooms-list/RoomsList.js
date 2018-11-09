import React from 'react';
import {
  Div,
} from '@vkontakte/vkui';
import { SpaceListItem } from '../../spaces/space-list-item/SpaceListItem';
import { RoomListItem } from '../room-list-item/RoomListItem';

type RoomsListProps = {
}

export class RoomsList extends React.PureComponent<RoomsListProps> {

  items = [
    {id: 1, name: 'item #1'},
    {id: 2, name: 'item #2'},
    {id: 3, name: 'item #3'},
    {id: 4, name: 'item #4'},
    {id: 5, name: 'item #5'},
  ];

  render () {
    return (
      this.items.map((item,i)=>{
        return <RoomListItem key={i} room={ item }/>;
      })
    );
  }
}
