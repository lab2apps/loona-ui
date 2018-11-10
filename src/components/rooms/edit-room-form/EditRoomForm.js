import React from 'react';
import {
  FormLayout,
  Input,
  FormLayoutGroup,
  Select,
  Textarea,
  Checkbox,
  Button,
  Tabs,
  Div,
  TabsItem,
} from '@vkontakte/vkui/';

import { ImageUploader } from '../../image-uploader/ImageUploader';
import { createRoom, removeRoom, updateRoom } from '../../../store/actions/roomActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { serialize } from '../../../utils/serialize';
import { withRouter } from 'react-router-dom';

type EditRoomFormProps = {
  roomId?: number,
  spaceId?: number,
}

const BOOK_TYPES = {
  WITH_CONFIRMATION: '0',
  WITHOUT_CONFIRMATION: '1',
};

@withRouter
@connect(null, mapDispatchToProps)
export class EditRoomForm extends React.PureComponent<EditRoomFormProps> {
  state = {
    bookType: BOOK_TYPES.WITH_CONFIRMATION,
  };

  componentDidMount () {
    if (this.props.room) {
      this.setState({
        bookType: this.props.room.bookingType || BOOK_TYPES.WITH_CONFIRMATION,
      });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const formData = serialize(event.target);

    let promise;

    if (this.props.room) {
      promise = this.props.updateRoom(this.props.roomId, formData);
    } else {
      promise = this.props.createRoom(
        {
          ...formData,
          spaceId: this.props.spaceId,
        });
    }

    promise.then(() => {
      this.props.history.goBack();
    });
  };

  remove = () => {
    this.props.removeRoom(this.props.roomId)
      .then(() => {
        this.props.history.push('/my');
      });
  };

  render () {
    return (
      <FormLayout className="l-bg-white"
                  onSubmit={ this.onSubmit }>

        <Input type="text"
               name={ 'name' }
               required={ true }
               defaultValue={ this.props.room && this.props.room.name }
               top="Название места"
               placeholder="Введите название места"/>

        <Select top="Тип Места" placeholder="Выберите тип места"
                defaultValue={ this.props.room && this.props.room.roomType }
                name='roomType'>
          <option value="0">Комната</option>
          <option value="1">Здание</option>
          <option value="1">Стол</option>
        </Select>

        <ImageUploader name={ 'imageUrls' }
                       uploadedFiles={ this.props.room && this.props.room.imageUrls }
                       label={ 'Открыть галерею' }
                       top={ 'Добавить фото' }/>


        <Textarea top="Описание места" name={ 'description' }
                  defaultValue={ this.props.room && this.props.room.description }/>

        <div class="l-flex">
          <div class="l-flex__item">
            <div class="FormLayout__row-top">Этаж</div>
            <Input type="tel"
                   top="Этаж"
                   defaultValue={ this.props.room && this.props.room.floor }
                   name={ 'floor' }
                   placeholder="Выберите этаж"/>
          </div>
          <div class="l-flex__item">
            <div class="FormLayout__row-top">Метраж</div>
            <Input type="tel"
                   top="Метраж"
                   defaultValue={ this.props.room && this.props.room.footage }
                   name={ 'footage' }
                   placeholder="Кол-во метров"/>
          </div>
        </div>

        <FormLayoutGroup top="Цена" className="l-flex">
          <Input type="tel"
                 top="Цена"
                 defaultValue={ this.props.room && this.props.room.price }
                 name={ 'price' }
                 required={ true }
                 className="l-flex__item"
                 placeholder="Введите цену"/>

          <div class="l-text-gray">/</div>

          <Select defaultValue={ this.props.room && this.props.room.rentType || 'day' } className="l-flex__item"
                  style={ { paddingTop: 0 } }
                  name='rentType'>
            <option value="month">Месяц</option>
            <option value="day">День</option>
            <option value="hour">Час</option>
          </Select>
        </FormLayoutGroup>

        <Div>
          <Tabs type="buttons" className="l-tabs-primary">
            <TabsItem
              onClick={ () => this.setState({ bookType: BOOK_TYPES.WITH_CONFIRMATION }) }
              selected={ this.state.bookType === BOOK_TYPES.WITH_CONFIRMATION }
            >
              С подтверждением
            </TabsItem>
            <TabsItem
              onClick={ () => this.setState({ bookType: BOOK_TYPES.WITHOUT_CONFIRMATION }) }
              selected={ this.state.bookType === BOOK_TYPES.WITHOUT_CONFIRMATION }
            >
              Моментально
            </TabsItem>

            <div style={ { display: 'none' } }>
              <Input type='text' value={ this.state.bookType } name={ 'bookingType' }/>
            </div>
          </Tabs>
        </Div>


        <FormLayoutGroup top="Дни работы площадки">
          <Checkbox name={ 'options' } value={ '1' }
                    defaultChecked={ this.props.room && this.props.room.options.includes('1') }>Wi-Fi</Checkbox>
          <Checkbox name={ 'options' } value={ '2' }
                    defaultChecked={ this.props.room && this.props.room.options.includes('2') }>Кофемашина</Checkbox>
          <Checkbox name={ 'options' } value={ '3' }
                    defaultChecked={ this.props.room && this.props.room.options.includes('3') }>Проектор</Checkbox>
          <Checkbox name={ 'options' } value={ '4' }
                    defaultChecked={ this.props.room && this.props.room.options.includes('4') }>Аудио колонки</Checkbox>
          <Checkbox name={ 'options' } value={ '5' }
                    defaultChecked={ this.props.room && this.props.room.options.includes('5') }>Микрофон</Checkbox>
          <Checkbox name={ 'options' } value={ '6' }
                    defaultChecked={ this.props.room && this.props.room.options.includes('6') }>МФУ</Checkbox>
        </FormLayoutGroup>

        <Button size="xl" level="primary">{ this.props.room ? 'Сохранить' : 'Добавить место' }</Button>

        { this.props.room &&
        <Button size="xl" level="outline"
                type='button'
                style={ { borderColor: 'transparent', color: '#E64646' } }
                onClick={ this.remove }>Удалить место</Button>
        }

      </FormLayout>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ createRoom, updateRoom, removeRoom }, dispatch);
}
