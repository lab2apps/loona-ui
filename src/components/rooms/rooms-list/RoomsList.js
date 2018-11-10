import React from 'react';
import {
  List,
} from '@vkontakte/vkui';

import { RoomListItem } from '../room-list-item/RoomListItem';

type RoomsListProps = {}

export class RoomsList extends React.PureComponent<RoomsListProps> {

  items = [
    { id: 1, name: 'item #1' },
    { id: 2, name: 'item #2' },
    { id: 3, name: 'item #3' },
    { id: 4, name: 'item #4' },
    { id: 5, name: 'item #5' },
  ];

  render () {
    return (
      <List>
        { this.items.map((item, i) => {
          return <RoomListItem key={ i } room={ item }/>;
        }) }
      </List>
    );
  }
}
