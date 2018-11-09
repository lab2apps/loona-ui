import React from 'react';
import {
  Div,
} from '@vkontakte/vkui';
import { RoomsList } from '../../rooms/rooms-list/RoomsList';

type SpaceDetailsProps = {}

export class SpaceDetails extends React.PureComponent<SpaceDetailsProps> {
  render () {
    return (
      <React.Fragment>
        <Div>
          Space details
        </Div>

        <RoomsList>
        </RoomsList>
      </React.Fragment>
    );
  }
}
