import React from 'react';
import { List } from '@vkontakte/vkui';

import { SpaceListItem } from '../space-list-item/SpaceListItem';

type SpacesListProps = {
  spaces: any[];
}

export class SpacesList extends React.PureComponent<SpacesListProps> {
  render () {
    return (
      <List>
        { this.props.spaces.map((item, i) => {
          return <SpaceListItem key={ i } space={ item }/>;
        }) }
      </List>
    );
  }
}
