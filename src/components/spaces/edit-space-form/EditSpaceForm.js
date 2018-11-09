import React from 'react';
import {
  Button,
  Checkbox,
  FormLayout,
  FormLayoutGroup,
  Input, Link,
  Radio,
  Select,
  Textarea,
} from '@vkontakte/vkui';

export class EditSpaceForm extends React.PureComponent {
  render () {
    return (
      <FormLayout>
        <Input type="email" top="E-mail" />
        <FormLayoutGroup top="Пароль" bottom="Пароль может содержать только латинские буквы и цифры.">
          <Input type="password"  placeholder="Введите пароль" />
          <Input type="password" placeholder="Повторите пароль" />
        </FormLayoutGroup>
        <Input top="Имя" />
        <Input top="Фамилия" />
        <Select top="Пол" placeholder="Выберите пол">
          <option value="m">Мужской</option>
          <option value="f">Женский</option>
        </Select>
        <div top="Тип документа">
          <Radio name="type">Паспорт</Radio>
          <Radio name="type">Загран</Radio>
        </div>
        <Textarea top="О себе" />
        <FormLayoutGroup>
          <Checkbox>Согласен со всем <Link>этим</Link></Checkbox>
          <div>
            <Button type="cell">Зарегистрироваться</Button>
          </div>
        </FormLayoutGroup>
      </FormLayout>
    );
  }
}
