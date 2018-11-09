import React from 'react';
import queryString from 'query-string';
import { PanelHeader } from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';

@withRouter
export class EditRoom extends React.PureComponent {

  componentDidMount () {
    console.warn('this.props',queryString.parse(this.props.location.search).id)
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Edit room
        </PanelHeader>
      </React.Fragment>
    );
  };
}
