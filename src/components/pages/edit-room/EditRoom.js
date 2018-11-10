import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { PanelHeader } from '@vkontakte/vkui';
import { EditRoomForm } from '../../rooms/edit-room-form/EditRoomForm';

@withRouter
export class EditRoom extends React.PureComponent {

  get roomId () {
    return queryString.parse(this.props.location.search).id;
  }

  get spaceId () {
    return queryString.parse(this.props.location.search).spaceId;
  }

  componentDidMount () {
    console.warn('roomId', this.roomId);
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          { this.roomId ? 'Изменить' : 'Создать' } помещение
        </PanelHeader>

        <EditRoomForm roomId={ this.roomId }
                      spaceId={ this.spaceId }>
        </EditRoomForm>

      </React.Fragment>
    );
  };
}
