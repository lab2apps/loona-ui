import React from 'react';
import {
  Button,
  Checkbox,
  FormLayout,
  FormLayoutGroup,
  Input, Link,
  Select,
  Textarea,
  Div,
  File,
} from '@vkontakte/vkui';

import Icon24Camera from '@vkontakte/icons/dist/24/camera';

type EditSpaceFormProps = {
  spaceId: number,
}

export class EditSpaceForm extends React.PureComponent<EditSpaceFormProps> {
  render () {
    return (
      <FormLayout className="l-bg-white">

        <Input type="text"
               top="Название площадки"
               placeholder="Введите название площадки"/>

        <Select top="Тип площадки" placeholder="Выберите тип площадки">
          <option value="a">А</option>
          <option value="b">Б</option>
        </Select>

        <File top="Добавить фото" before={<Icon24Camera/>} size="l">
          Открыть галерею
        </File>

        <Textarea top="Описание площадки"/>

        <Input type="text"
               top="Адрес площадки"
               placeholder="Введите адрес площадки"/>

        <Input type="text"
               top="Телефон для связи"
               placeholder="Введите телефон"/>

        <FormLayoutGroup top="Дни работы площадки">
          <Checkbox>Понедельник</Checkbox>
          <Checkbox>Вторник</Checkbox>
          <Checkbox>Среда</Checkbox>
          <Checkbox>Четверг</Checkbox>
          <Checkbox>Пятница</Checkbox>
          <Checkbox>Суббота</Checkbox>
          <Checkbox>Воскресенье</Checkbox>
        </FormLayoutGroup>

        <FormLayoutGroup
          top="Дни работы площадки"
          className="l-time-range">
          <Input className='l-time-range__input' type="time" defaultValue="09:00"/>
          <Input className='l-time-range__input' type="time" defaultValue="20:00"/>
        </FormLayoutGroup>

        <Div className='l-text-gray'>
          После подтверждения создания площадки, она будет отправлена на модерацию, но вы можете добавлять в ней комнаты
          и пространства
        </Div>

        <Checkbox>Согласен с <Link>правилами сервиса</Link></Checkbox>

        <Button size="xl" level="primary">Создать площадку</Button>

      </FormLayout>
    );
  }
}
