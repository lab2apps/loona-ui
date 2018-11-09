import React from 'react';
import { PanelHeader } from '@vkontakte/vkui';

export class Dashboard extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Dashboard
        </PanelHeader>
      </React.Fragment>
    );
  };
}
