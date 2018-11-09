import React from 'react';
import {
  Div,
} from '@vkontakte/vkui';
import { Link, withRouter } from 'react-router-dom';

type SpaceData = {
  id: string,
  name: string,
}

type SpaceListItemProps = {
  space: SpaceData
}

@withRouter
export class SpaceListItem extends React.PureComponent<SpaceListItemProps> {
  render () {

    console.log(this.props);
    return (
      <Div>
        <Link to={ `/${this.props.location.pathname.split('/')[1]}/space-details?id=${ this.props.space.id }` }>Space list item</Link>
      </Div>
    );
  }
}

