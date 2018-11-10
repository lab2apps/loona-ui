import React from 'react';
import {
  PanelHeader, HeaderButton, IOS, platform,
} from '@vkontakte/vkui';
import { RoomBooking } from '../../rooms/room-booking/RoomBooking';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { withRouter } from 'react-router-dom';

const osname = platform();

type BookingRoomProps = {}

@withRouter
export class Booking extends React.PureComponent<BookingRoomProps> {
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

        <RoomBooking>
        </RoomBooking>
      </React.Fragment>
    );
  }
}
