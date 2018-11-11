import React from 'react';
import {
  Button,
  Cell,
  Div,
  Group,
  InfoRow,
  List,
} from '@vkontakte/vkui';
import { DayPickerRangeController } from 'react-dates';
import { START_DATE } from 'react-dates/src/constants';

import Icon24About from '@vkontakte/icons/dist/24/about';
import Icon24Flash from '@vkontakte/icons/dist/24/flash';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import moment from 'moment';
import { RoomApiService } from '../../../services/RoomApiService';
import * as vkConnect from '@vkontakte/vkui-connect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

type RoomInfo = {}

type RoomDetailsProps = {
  room: RoomInfo
}

@withRouter
export class RoomBooking extends React.PureComponent<RoomDetailsProps> {

  state = {
    focusedInput: START_DATE,
    startDate: null,
    endDate: null,
    currentMonth: moment(),
    numberOfDays: 0,
    orders: [],
  };

  constructor (props) {
    super(props);

    let days = 0;

    if (this.props.startDate && this.props.endDate) {
      days = moment(this.props.endDate).diff(moment(this.props.startDate), 'day') + 1 || 0;
    }

    this.state = {
      ...this.state,
      startDate: this.props.startDate && moment(this.props.startDate),
      endDate: this.props.endDate && moment(this.props.endDate),
      numberOfDays: days,
      currentMonth: (this.props.startDate && moment(this.props.startDate)) || moment(),
    };

    console.log(this.state);
  }

  componentDidMount () {
    this.updateOrders();
    console.warn('location', window.location);
  }

  isDateBlocked = (day) => {
    if (day.isBefore(moment(), 'day')) {
      return true;
    }

    return this.state.orders.includes(day.format('YYYY-MM-DD'));
  };

  onMonthChange = (date) => {
    this.setState({
      currentMonth: moment(date),
    }, () => {
      this.updateOrders();
    });
  };

  updateOrders = () => {
    const start = this.state.currentMonth.clone().startOf('month');
    const end   = this.state.currentMonth.clone().endOf('month');

    RoomApiService.getOrders(this.props.room.uuid, start, end).then((data) => {
      this.setState({
        orders: data,
      });
    });
  };

  onDatesChange = ({ startDate, endDate }) => {
    console.warn('onDatesChange', { startDate, endDate });

    let numberOfDays = 0;

    if (endDate && startDate) {
      numberOfDays = endDate.diff(startDate, 'days') + 1;
    }

    this.setState({ startDate, endDate, numberOfDays });
  };

  onFocusChange = (focusedInput) => {
    console.warn('onFocusChange', focusedInput);
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  };

  confirmBooking = () => {
    RoomApiService.confirmBooking(this.props.room.uuid, this.state.startDate, this.state.endDate).then((data) => {

      window._vk_pay_room = this.props.room.uuid;
      window._vk_pay_order = data.orderId;

      vkConnect.send("VKWebAppOpenPayForm", {
        "app_id": 6741544,
        "action": "pay-to-group",
        "params": {
          "amount": data.price,
          "description": `Бронирование ${this.props.room.uuid}`,
          "group_id": data.receiverId,
          "extra": `${data.orderId}:${this.props.room.uuid}`,
        },
      });

      this.props.history.push(`/all/room-details?id=${this.props.room.uuid}`);
    })
  };

  render () {
    const { focusedInput, startDate, endDate } = this.state;

    const startDateString = startDate ? startDate.format('YYYY-MM-DD') : '';
    const endDateString   = endDate ? endDate.format('YYYY-MM-DD') : '';

    return (
      <React.Fragment>

        <Group>
          <List>
            <Cell multiline>
              <div className='l-notification'>
                <div className="l-notification__icon" style={{ color: 'var(--steel_gray_500)' }}>
                  <Icon24About/>
                </div>
                <div className="l-notification__content l-text-gray">
                  Чтобы забронировать место, выберите день или интервал и подтвердите бронь
                </div>
              </div>
            </Cell>

            {this.props.room.mySpace && (
              <Cell multiline> {/* FOR ADMINS ONLY */}
                <div className='l-notification'>
                  <div className="l-notification__icon" style={{ color: 'var(--steel_gray_500)' }}>
                    <Icon24About/>
                  </div>
                  <div className="l-notification__content l-text-gray">
                    Бронирование своей площадки означает, что вы получите оплату наличными
                  </div>
                </div>
              </Cell>
            )}

            {this.props.room.bookingType === '1' && (
              <Cell multiline>
                <div className='l-notification'>
                  <div className="l-notification__icon" style={{ color: 'var(--green)' }}>
                    <Icon24Flash/>
                  </div>
                  <div className="l-notification__content l-text-gray">
                    Место бронируется без подтверждения арендодателя
                  </div>
                </div>
              </Cell>
            )}

            {this.props.room.bookingType === '0' && (
              <Cell multiline>
                <div className='l-notification'>
                  <div className="l-notification__icon" style={{ color: 'var(--yellow)' }}>
                    <Icon24Recent/>
                  </div>
                  <div className="l-notification__content l-text-gray">
                    Место бронируется c подтверждением
                  </div>
                </div>
              </Cell>
            )}

            <Cell>
              <div className="l-flex">
                <InfoRow className="l-flex__item" title="Количество дней">
                  {this.state.numberOfDays}
                </InfoRow>
                <InfoRow className="l-flex__item" title="Цена, ₽">
                  {this.props.room.price * this.state.numberOfDays}
                </InfoRow>
              </div>
            </Cell>
          </List>
        </Group>

        <Group>
          <Div>
            <div hidden>
              <input type="text" name="startRentTime" value={startDateString} readOnly/>
              <input type="text" name="endRentTime" value={endDateString} readOnly/>
            </div>

            <div className="l-centralizer l-border-box l-calendar">
              <DayPickerRangeController
                onDatesChange={this.onDatesChange}
                onFocusChange={this.onFocusChange}
                onPrevMonthClick={this.onMonthChange}
                onNextMonthClick={this.onMonthChange}
                isDayBlocked={(day) => this.isDateBlocked(day)}
                minimumNights={0}
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </Div>

          <Div>
            <Button size="xl" level="primary" disabled={!this.state.endDate || !this.state.startDate}
                    onClick={this.confirmBooking}>Подтвердить бронь</Button>
          </Div>
        </Group>
      </React.Fragment>
    );
  }
}
