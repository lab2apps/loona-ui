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
        { this.props.spaces.map((item) => {
          return <SpaceListItem key={ item.uuid } space={ item }/>;
        }) }
      </List>
    );
  }
}
