import React from 'react';
import { withRouter } from 'react-router-dom';
import { PanelHeader } from '@vkontakte/vkui';
import { SpacesList } from '../../spaces/spaces-list/SpacesList';

@withRouter
export class MySpaces extends React.PureComponent {

  componentDidMount () {
    console.warn('spaceId', this.spaceId)
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Мои площадки
        </PanelHeader>

        <SpacesList>
        </SpacesList>

      </React.Fragment>
    );
  };

}
