import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { HeaderButton, IOS, PanelHeader, platform } from '@vkontakte/vkui';
import { EditRoomForm } from '../../rooms/edit-room-form/EditRoomForm';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

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
        <PanelHeader  addon={ <HeaderButton onClick={ this.props.history.goBack }>Назад</HeaderButton> }
                      left={ <HeaderButton onClick={ this.props.history.goBack }>{ osname === IOS ?
                        <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>
          { this.roomId ? 'Изменить' : 'Создать' } помещение
        </PanelHeader>

        <EditRoomForm roomId={ this.roomId }
                      spaceId={ this.spaceId }>
        </EditRoomForm>

      </React.Fragment>
    );
  };
}
