import React from 'react';
import { withRouter } from 'react-router-dom';
import { PanelHeader, Div, Button } from '@vkontakte/vkui';

import { SpacesList } from '../../spaces/spaces-list/SpacesList';

@withRouter
export class MySpaces extends React.PureComponent {

  componentDidMount () {
    console.warn('spaceId', this.spaceId);
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Мои площадки
        </PanelHeader>

        <Div>
          <Button size='xl'
                  onClick={ () => {
                    this.props.history.push('/my/edit-space');
                  } }>
            Создать площадку
          </Button>
        </Div>

        <SpacesList>
        </SpacesList>

      </React.Fragment>
    );
  };

}
