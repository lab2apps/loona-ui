import React from 'react';
import {
  PanelHeader, HeaderButton, IOS, platform,
} from '@vkontakte/vkui';
import { RoomBooking } from '../../rooms/room-booking/RoomBooking';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { withRouter } from 'react-router-dom';
import querystring from 'query-string';
import { getRoom } from '../../../store/actions/roomActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export const osname = platform();

type BookingRoomProps = {}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class Booking extends React.PureComponent<BookingRoomProps> {
  get params () {
    return querystring.parse(this.props.location.search);
  }

  componentDidMount () {
    this.props.getRoom(this.params.id);
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader
          addon={<HeaderButton onClick={this.props.history.goBack}>Отменить</HeaderButton>}
          left={
            <HeaderButton onClick={this.props.history.goBack}>{
              osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>
          }>
          Бронирование
        </PanelHeader>

        {this.props.room && (
        <RoomBooking room={this.props.room}
                     startDate={this.params.startDate}
                     endDate={this.params.endDate}>
        </RoomBooking>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state.room;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({getRoom}, dispatch);
}
