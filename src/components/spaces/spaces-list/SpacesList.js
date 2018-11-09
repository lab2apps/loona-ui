import React from 'react';
import {
  Div,
} from '@vkontakte/vkui';
import { SpaceListItem } from '../space-list-item/SpaceListItem';


type SpacesListProps = {
}

export class SpacesList extends React.PureComponent<SpacesListProps> {

  items = [1,2,3,4,5];

  render () {
    return (
      this.items.map((item,i)=>{
        return <SpaceListItem key={i}/>;
      })
    );
  }
}
