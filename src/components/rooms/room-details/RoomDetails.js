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

type RoomInfo = {}

type RoomDetailsProps = {
  room: RoomInfo
}

export class RoomDetails extends React.PureComponent<RoomDetailsProps> {

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

        <div className="l-detailed-place-image">
          <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>fake image</div>
        </div>

        <Group>
          <List>
            <Cell
              size="l"
              description="Место"
              bottomContent={

                // FOR OWNER ONLY
                <div style={{ display: 'flex', paddingTop: '10px' }}>
                  <Button size="l" stretched style={{ marginRight: 8 }}
                          onClick={this.onMessageButtonClick}>Бронировать</Button>
                  <Button size="l" stretched level="secondary" onClick={this.onEditButtonClick}>На просмотр</Button>
                </div>

              }>
              Киоск на фуд-корте
            </Cell>
          </List>
        </Group>

        <Group>
          <List>
            <Cell>
              <InfoRow title="Описание места">
                Уютное место на фудкорте в Севкабеле, предназначенное для угощения гостей
              </InfoRow>
            </Cell>

            <Cell>
              <InfoRow title="Метраж">
                30m
              </InfoRow>
            </Cell>

            <Cell>
              <InfoRow title="Дополнительные удобства">
                Wi-Fi, Кофемашина
              </InfoRow>
            </Cell>
          </List>
        </Group>

        <Group>
          <List>
            <Cell>
              <InfoRow title="Доступность"></InfoRow>
            </Cell>
          </List>

          <Div>

            <input type="text" name="start date" value={startDateString} readOnly />
            <input type="text" name="end date" value={endDateString} readOnly />

            <DayPickerRangeController
              onDatesChange={this.onDatesChange}
              onFocusChange={this.onFocusChange}
              focusedInput={focusedInput}
              startDate={startDate}
              endDate={endDate}
            />

          </Div>

          <Div>
            <Button size="xl" level="primary">Бронировать</Button>
          </Div>
        </Group>

        <pre>
          {JSON.stringify(this.props.room, null, 2)}
        </pre>

      </React.Fragment>
    );
  }
}
