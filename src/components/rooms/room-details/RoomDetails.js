import React from 'react';
import {
  Button,
  Cell,
  Div, Gallery,
  Group,
  InfoRow,
  List,
} from '@vkontakte/vkui';
import { DayPickerRangeController } from 'react-dates';
import { START_DATE } from 'react-dates/src/constants';
import { ROOM_TYPES } from '../../../contants/ROOM_TYPES';
import { OPTIONS } from '../../../contants/OPTIONS';
import { withRouter } from 'react-router-dom';
import { environment } from '../../../config/environment';
import { RoomApiService } from '../../../services/RoomApiService';
import moment from 'moment';

type RoomInfo = {}

type RoomDetailsProps = {
  room: RoomInfo
}

@withRouter
export class RoomDetails extends React.PureComponent<RoomDetailsProps> {

  state = {
    focusedInput: START_DATE,
    currentMonth: moment(),
    startDate: null,
    endDate: null,
    orders: [],
  };

  componentDidMount () {
    this.updateOrders();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.room !== this.props.room) {
      this.updateOrders();
    }
  }

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

  isDateBlocked = (day) => {
    if (day.isBefore(moment(), 'day')) {
      return true;
    }

    return this.state.orders.includes(day.format('YYYY-MM-DD'));
  };

  onDatesChange = ({ startDate, endDate }) => {
    console.warn('onDatesChange', { startDate, endDate });

    this.setState({ startDate, endDate });
  };

  onEditButtonClick = () => {
    this.props.history.push(`/my/edit-room?id=${ this.props.room.uuid }`);
  };

  onBookRoomButtonClick = () => {
    let startDate = '';
    let endDate   = '';

    if (this.state.startDate) {
      startDate = this.state.startDate.format('YYYY-MM-DD');
    }

    if (this.state.endDate) {
      endDate = this.state.endDate.format('YYYY-MM-DD');
    }

    this.props.history.push(`/my/book-room?id=${ this.props.room.uuid }&startDate=${startDate}&endDate=${endDate}`);
  };

  onBookRoomReviewButtonClick = () => {
    // TODO add params to indicate that we booking room, not room review
    this.props.history.push(`/my/book-room?id=${ this.props.room.uuid }`);
  };

  onFocusChange = (focusedInput) => {
    console.warn('onFocusChange', focusedInput);
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  };

  sendMessage = () => {
    window.location.replace('https://vk.com/im?sel=' + this.props.room.userId)
  };

  render () {
    const { focusedInput, startDate, endDate } = this.state;

    const startDateString = startDate ? startDate.format('YYYY-MM-DD') : '';
    const endDateString   = endDate ? endDate.format('YYYY-MM-DD') : '';

    console.log(this.state.orders);

    return (
      <React.Fragment>
        <Group>
          {this.props.room.imageUrls.length > 0 && (
            <Gallery style={{ height: 150 }}
                     bullets={'dark'}>
              {this.props.room.imageUrls.map((image, i) => {
                return <img src={`${environment.apiUrl}/image/${image}`} key={i} alt="room pics"/>;
              })}
            </Gallery>
          )}

          <List>
            <Cell
              size="l"
              indicator={this.props.room.myRent && <div className='l-indicator--rented'>арендую</div>}
              description={ROOM_TYPES[this.props.room.roomType]}
              bottomContent={
                <div style={{ display: 'flex', paddingTop: '10px' }}>
                  <Button size="l" stretched style={{ marginRight: 8 }}
                          onClick={this.onBookRoomButtonClick}>Бронировать
                  </Button>


                  {this.props.room.mySpace && (
                    <Button size="l" stretched level="secondary"
                            onClick={this.onEditButtonClick}>Редактировать
                    </Button>
                  )}

                  {!this.props.room.mySpace && (
                    <Button size="l" stretched level="secondary"
                            component={'a'}
                            href={'https://vk.me/id' + this.props.room.userId}>На просмотр
                    </Button>
                  )}
                </div>

              }>
              {this.props.room.name}
            </Cell>
          </List>
        </Group>

        <Group>
          <List>
            {this.props.room.description && (
              <Cell>
                <InfoRow title="Описание места">
                  <div style={{ whiteSpace: 'initial' }}>
                    {this.props.room.description}
                  </div>
                </InfoRow>
              </Cell>
            )}

            <Cell>
              <div className='l-flex'>
                {this.props.room.footage &&
                <InfoRow title="Метраж" className="l-flex__item">
                  {this.props.room.footage}м
                </InfoRow>
                }

                {this.props.room.floor &&
                <InfoRow title="Этаж" className="l-flex__item">
                  {this.props.room.floor}
                </InfoRow>
                }

                {this.props.room.price !== 0 &&
                <InfoRow title="Цена, ₽" className="l-flex__item">
                  {this.props.room.price || 'Бесплатно'}
                </InfoRow>
                }


                {this.props.room.price === 0 &&
                <InfoRow title="Цена, ₽" className="l-flex__item">
                  Бесплатно
                </InfoRow>
                }
              </div>
            </Cell>


            {this.props.room.options.length > 0 && (
              <Cell>
                <InfoRow title="Дополнительные удобства">
                  <div style={{ whiteSpace: 'initial' }}>
                    {this.props.room.options.map((item) => OPTIONS[item]).join(', ')}
                  </div>
                </InfoRow>
              </Cell>
            )}
          </List>
        </Group>

        <Group>
          <List>
            <Cell>
              <InfoRow title="Доступность">
              </InfoRow>
            </Cell>
          </List>

          <Div>
            <div hidden>
              <input type="text" name="start date" value={startDateString} readOnly/>
              <input type="text" name="end date" value={endDateString} readOnly/>
            </div>

            <div className="l-centralizer l-border-box l-calendar">
              <DayPickerRangeController
                onPrevMonthClick={this.onMonthChange}
                onNextMonthClick={this.onMonthChange}
                onDatesChange={this.onDatesChange}
                onFocusChange={this.onFocusChange}
                isDayBlocked={(day) => this.isDateBlocked(day)}
                minimumNights={0}
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </Div>

          <Div>
            <Button
              size="xl"
              level="primary"
              onClick={this.onBookRoomButtonClick}>
              Бронировать
            </Button>
          </Div>
        </Group>
      </React.Fragment>
    );
  }
}
