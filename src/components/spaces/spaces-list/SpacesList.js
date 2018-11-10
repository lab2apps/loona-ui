import React from 'react';
import {
  Div,
  Panel,
  PanelHeader,
  FixedLayout,
  Tabs,
  TabsItem,
  Search,
} from '@vkontakte/vkui';

import { SpaceListItem } from '../space-list-item/SpaceListItem';

type SpacesListProps = {}

export class SpacesList extends React.PureComponent<SpacesListProps> {

  items = [
    { id: 1, name: 'item #1' },
    { id: 2, name: 'item #2' },
    { id: 3, name: 'item #3' },
    { id: 4, name: 'item #4' },
    { id: 5, name: 'item #5' },
    { id: 1, name: 'item #1' },
    { id: 2, name: 'item #2' },
    { id: 3, name: 'item #3' },
    { id: 4, name: 'item #4' },
    { id: 5, name: 'item #5' },
    { id: 1, name: 'item #1' },
    { id: 2, name: 'item #2' },
    { id: 3, name: 'item #3' },
    { id: 4, name: 'item #4' },
    { id: 5, name: 'item #5' },
    { id: 1, name: 'item #1' },
    { id: 2, name: 'item #2' },
    { id: 3, name: 'item #3' },
    { id: 4, name: 'item #4' },
    { id: 5, name: 'item #5' },
    { id: 1, name: 'item #1' },
    { id: 2, name: 'item #2' },
    { id: 3, name: 'item #3' },
    { id: 4, name: 'item #4' },
    { id: 5, name: 'item #5' },
    { id: 1, name: 'item #1' },
    { id: 2, name: 'item #2' },
    { id: 3, name: 'item #3' },
    { id: 4, name: 'item #4' },
    { id: 5, name: 'item #5' },
  ];

  render () {
    return (
      this.items.map((item, i) => {
        return <SpaceListItem key={i} space={item}/>;
      })
    );
  }
}
