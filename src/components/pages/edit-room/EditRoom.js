import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { HeaderButton, IOS, PanelHeader, platform } from '@vkontakte/vkui';
import { EditRoomForm } from '../../rooms/edit-room-form/EditRoomForm';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { getRoom } from '../../../store/actions/roomActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const osname = platform();

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class EditRoom extends React.PureComponent {

  get roomId () {
    return queryString.parse(this.props.location.search).id;
  }

  get spaceId () {
    return queryString.parse(this.props.location.search).spaceId;
  }

  componentDidMount () {
    if (this.roomId) {
      this.props.getRoom(this.roomId);
    }
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader addon={ <HeaderButton onClick={ this.props.history.goBack }>Назад</HeaderButton> }
                     left={ <HeaderButton onClick={ this.props.history.goBack }>{ osname === IOS ?
                       <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>
          { this.roomId ? 'Ред. места' : 'Создать места' }
        </PanelHeader>

        { this.roomId && this.props.room && (
          <EditRoomForm roomId={ this.roomId }
                        room={ this.props.room }
                        spaceId={ this.spaceId }>
          </EditRoomForm>
        ) }


        { !this.roomId && (
          <EditRoomForm spaceId={ this.spaceId }/>
        ) }
      </React.Fragment>
    );
  };
}

function mapStateToProps (state) {
  return state.room;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getRoom,
  }, dispatch);
}
