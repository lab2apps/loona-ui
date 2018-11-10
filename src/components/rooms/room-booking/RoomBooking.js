import React from 'react';
import {
  Button,
  Cell,
  Div,
  Group,
  InfoRow,
  List,
} from '@vkontakte/vkui';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController} from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/src/constants';

import Icon24About from '@vkontakte/icons/dist/24/about';
import Icon24Flash from '@vkontakte/icons/dist/24/flash';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';

type RoomInfo = {}

type RoomDetailsProps = {
  room: RoomInfo
}

export class RoomBooking extends React.PureComponent<RoomDetailsProps> {

  state = {
    focusedInput: START_DATE,
    startDate: null,
    endDate: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    console.warn('onDatesChange',{ startDate, endDate });
    this.setState({ startDate, endDate });
  };

  onFocusChange = (focusedInput) => {
    console.warn('onFocusChange',focusedInput);
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  };


  render () {
    const { focusedInput, startDate, endDate } = this.state;
    const startDateString = startDate ? startDate.format('YYYY-MM-DD') : '';
    const endDateString = endDate ? endDate.format('YYYY-MM-DD') : '';


    return (
      <React.Fragment>

        <Group>
          <List>
            <Cell multiline>
              <div className='l-notification'>
                <div className="l-notification__icon" style={ { color: 'var(--steel_gray_500)' } }>
                  <Icon24About/>
                </div>
                <div className="l-notification__content l-text-gray">
                  Чтобы забронировать место, выберите день или интервал и подтвердите бронь
                </div>
              </div>
            </Cell>

            <Cell multiline> {/* FOR ADMINS ONLY */}
              <div className='l-notification'>
                <div className="l-notification__icon" style={ { color: 'var(--steel_gray_500)' } }>
                  <Icon24About/>
                </div>
                <div className="l-notification__content l-text-gray">
                  Бронирование своей площадки означает, что вы получите оплату наличными
                </div>
              </div>
            </Cell>

            <Cell multiline>
              <div className='l-notification'>
                <div className="l-notification__icon" style={ { color: 'var(--green)' } }>
                  <Icon24Flash/>
                </div>
                <div className="l-notification__content l-text-gray">
                  Место бронируется без подтверждения
                </div>
              </div>
            </Cell>

            <Cell multiline>
              <div className='l-notification'>
                <div className="l-notification__icon" style={ { color: 'var(--yellow)' } }>
                  <Icon24Recent/>
                </div>
                <div className="l-notification__content l-text-gray">
                  Место бронируется c подтверждением
                </div>
              </div>
            </Cell>

            <Cell>
              <div className="l-flex">
                <InfoRow className="l-flex__item" title="Количество часов">
                  6
                </InfoRow>
                <InfoRow className="l-flex__item" title="Цена, ₽">
                  1200
                </InfoRow>
              </div>
            </Cell>
          </List>
        </Group>

        <Group>
          <Div>
            <div hidden>
              <input type="text" name="start date" value={startDateString} readOnly />
              <input type="text" name="end date" value={endDateString} readOnly />
            </div>

            <div class="l-centralizer l-border-box">
              <DayPickerRangeController
                withFullScreenPortal={true}
                onDatesChange={this.onDatesChange}
                onFocusChange={this.onFocusChange}
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </Div>

          <Div>
            <Button size="xl" level="primary">Подтвердить бронь</Button>
          </Div>
        </Group>

        <pre>
          {JSON.stringify(this.props.room, null, 2)}
        </pre>

      </React.Fragment>
    );
  }
}
