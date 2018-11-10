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
  TabsItem,
} from '@vkontakte/vkui/';

import { ImageUploader } from '../../image-uploader/ImageUploader';
import { createRoom } from '../../../store/actions/roomActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { serialize } from '../../../utils/serialize';

type EditRoomFormProps = {
  roomId: number,
  spaceId: number,
}

const BOOK_TYPES = {
  WITH_CONFIRMATION: '0',
  WITHOUT_CONFIRMATION: '1',
};

@connect(null, mapDispatchToProps)
export class EditRoomForm extends React.PureComponent<EditRoomFormProps> {

  state = {
    bookType: BOOK_TYPES.WITH_CONFIRMATION,
  };

  componentDidMount () {
    console.warn('hala', this.props);
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.createRoom(
      {
        ...serialize(event.target),
        spaceId: this.props.spaceId,
      });
  };

  render () {
    return (
      <FormLayout className="l-bg-white"
                  onSubmit={ this.onSubmit }>

        <Input type="text"
               name={ 'name' }
               top="Название места"
               placeholder="Введите название места"/>

        <Select top="Тип Места" placeholder="Выберите тип места"
                name='roomType'>
          <option value="0">Комната</option>
          <option value="1">Здание</option>
          <option value="1">Стол</option>
        </Select>

        <ImageUploader name={ 'imageUrls' }
                       label={ 'Открыть галерею' }
                       top={ 'Добавить фото' }/>


        <Textarea top="Описание места" name={ 'description' }/>

        <div class="l-flex">
          <div class="l-flex__item">
            <div class="FormLayout__row-top">Этаж</div>
            <Input type="tel"
                   top="Этаж"
                   name={ 'floor' }
                   placeholder="Выберите этаж"/>
          </div>
          <div class="l-flex__item">
            <div class="FormLayout__row-top">Метраж</div>
            <Input type="tel"
                   top="Метраж"
                   name={ 'footage' }
                   placeholder="Кол-во метров"/>
          </div>
        </div>

        <FormLayoutGroup top="Цена" className="l-flex">
          <Input type="tel"
                 top="Цена"
                 name={ 'price' }
                 className="l-flex__item"
                 placeholder="Введите цену"/>

          <div class="l-text-gray">/</div>

          <Select defaultValue="day" className="l-flex__item" style={ { paddingTop: 0 } }
                  name='rentType'>
            <option value="month">Месяц</option>
            <option value="day">День</option>
            <option value="hour">Час</option>
          </Select>
        </FormLayoutGroup>

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
            <Input type='text' value={ this.state.bookType } name={ 'bookType' }/>
          </div>
        </Tabs>


        <FormLayoutGroup top="Дни работы площадки">
          <Checkbox name={ 'options' } value={ '1' }>Wi-Fi</Checkbox>
          <Checkbox name={ 'options' } value={ '2' }>Кофемашина</Checkbox>
          <Checkbox name={ 'options' } value={ '3' }>Проектор</Checkbox>
          <Checkbox name={ 'options' } value={ '4' }>Аудио колонки</Checkbox>
          <Checkbox name={ 'options' } value={ '5' }>Микрофон</Checkbox>
          <Checkbox name={ 'options' } value={ '6' }>МФУ</Checkbox>
        </FormLayoutGroup>

        <Button size="xl" level="primary">Добавить место</Button>

      </FormLayout>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ createRoom }, dispatch);
}
