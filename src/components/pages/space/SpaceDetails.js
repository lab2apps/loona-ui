import React from 'react';
import {
  Div, PanelHeader,
} from '@vkontakte/vkui';
import { SpaceDetails } from '../../spaces/space-details/SpaceDetails';

type SpaceDetailsProps = {}

export class Space extends React.PureComponent<SpaceDetailsProps> {
  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Детали площадки
        </PanelHeader>

        <SpaceDetails>
        </SpaceDetails>

      </React.Fragment>
    );
  }
}
