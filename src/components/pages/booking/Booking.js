import React from 'react';
import {
  Div, Group, PanelHeader,HeaderButton
} from '@vkontakte/vkui';
import Icon24About from '@vkontakte/icons/dist/24/about';
import { RoomDetails } from '../../rooms/room-details/RoomDetails';
import { RoomBooking } from '../../rooms/room-booking/RoomBooking';

type BookingRoomProps = {
}

export class Booking extends React.PureComponent<BookingRoomProps> {
  render () {
    return (
      <React.Fragment>
        <PanelHeader
          left={<HeaderButton>Отменить</HeaderButton>}
        >
          Бронирование
        </PanelHeader>

        <RoomBooking>
        </RoomBooking>
      </React.Fragment>
    );
  }
}
