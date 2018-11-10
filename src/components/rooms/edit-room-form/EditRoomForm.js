import React from 'react';
import {
  FormLayout,
  Input,
  FormLayoutGroup,
  Select,
  Radio,
  Textarea,
  Checkbox,
  Button,
  Link,
  Div,
  File,
  Group,
  List,
  Cell,
  Switch,
  Tabs,
  TabsItem,
} from '@vkontakte/vkui/';

import Icon24Camera from '@vkontakte/icons/dist/24/camera';

type EditRoomFormProps = {
  roomId: number,
}

const BOOK_TYPES = {
  WITH_CONFIRMATION: '123',
  WITHOUT_CONFIRMATION: '456',
}

export class EditRoomForm extends React.PureComponent<EditRoomFormProps> {

  state = {
    bookType: BOOK_TYPES.WITH_CONFIRMATION,
  };

  componentDidMount () {
    console.warn('hala', this.props)
  }

  render () {
    return (
      <FormLayout className="l-bg-white">

        <Input type="text"
               top="Название места"
               placeholder="Введите название места"/>

        <Select top="Тип Места" placeholder="Выберите тип места">
          <option value="a">А</option>
          <option value="b">Б</option>
        </Select>

        <File top="Добавить фото" before={<Icon24Camera/>} size="l">
          Открыть галерею
        </File>

        <Textarea top="Описание места"/>

        <div class="l-flex">
          <div class="l-flex__item">
            <div class="FormLayout__row-top">Этаж</div>
            <Input type="tel"
                   top="Этаж"
                   placeholder="Выберите этаж"/>
          </div>
          <div class="l-flex__item">
            <div class="FormLayout__row-top">Метраж</div>
            <Input type="tel"
                   top="Метраж"
                   placeholder="Кол-во метров"/>
          </div>
        </div>

        <FormLayoutGroup top="Цена" className="l-flex">
          <Input type="text"
                 top="Цена"
                 className="l-flex__item"
                 placeholder="Введите цену"/>

          <div class="l-text-gray">/</div>

          <Select defaultValue="day" className="l-flex__item" style={{paddingTop: 0}}>
            <option value="month">Месяц</option>
            <option value="day">День</option>
            <option value="hour">Час</option>
          </Select>
        </FormLayoutGroup>

        <Tabs type="buttons" className="l-tabs-primary">
          <TabsItem
            onClick={() => this.setState({ bookType: BOOK_TYPES.WITH_CONFIRMATION })}
            selected={this.state.bookType === BOOK_TYPES.WITH_CONFIRMATION}
          >
            С подтверждением
          </TabsItem>
          <TabsItem
            onClick={() => this.setState({ bookType: BOOK_TYPES.WITHOUT_CONFIRMATION })}
            selected={this.state.bookType === BOOK_TYPES.WITHOUT_CONFIRMATION}
          >
            Моментально
          </TabsItem>
        </Tabs>

        <FormLayoutGroup top="Дни работы площадки">
          <Checkbox>Wi-Fi</Checkbox>
          <Checkbox>Кофемашина</Checkbox>
          <Checkbox>Проектор</Checkbox>
          <Checkbox>Аудио колонки</Checkbox>
          <Checkbox>Микрофон</Checkbox>
          <Checkbox>МФУ</Checkbox>
        </FormLayoutGroup>

        <Button size="xl" level="primary">Добавить место</Button>

      </FormLayout>
    );
  }
}
