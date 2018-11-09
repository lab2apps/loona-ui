import React from 'react';
import {
  Div,
} from '@vkontakte/vkui';
import { Link } from 'react-router-dom';

type SpaceData = {
  id: string,
  name: string,
}

type SpaceListItemProps = {
  space: SpaceData
}

export class SpaceListItem extends React.PureComponent<SpaceListItemProps> {
  render () {
    return (
      <Div>
        <Link to={ `/space-details?id=${ this.props.space.id }` }>Space list item</Link>
      </Div>
    );
  }
}
