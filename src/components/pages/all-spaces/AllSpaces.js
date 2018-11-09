import React from 'react';
import { withRouter } from 'react-router-dom';
import { PanelHeader } from '@vkontakte/vkui';
import { SpacesList } from '../../spaces/spaces-list/SpacesList';

@withRouter
export class AllSpaces extends React.PureComponent {

  componentDidMount () {
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Все площадки
        </PanelHeader>

        <SpacesList>
        </SpacesList>

      </React.Fragment>
    );
  };

}
