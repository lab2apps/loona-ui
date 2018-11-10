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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSpace } from '../../../store/actions/spaceActions';
import { serialize } from '../../../utils/serialize';
import { ImageUploader } from '../../image-uploader/ImageUploader';

type EditSpaceFormProps = {
  spaceId?: number,
}

@connect(null, mapDispatchToProps)
export class EditSpaceForm extends React.PureComponent<EditSpaceFormProps> {
  onSubmit = (event) => {
    event.preventDefault();

    this.props.createSpace(serialize(event.target));
  };

  render () {
    return (
      <FormLayout className="l-bg-white" onSubmit={ this.onSubmit } name={ 'test' }>

        <Input type="text"
               top="Название площадки"
               name={ 'name' }
               placeholder="Введите название площадки"/>

        <Select top="Тип площадки" placeholder="Выберите тип площадки"
                name='type'>
          <option value="0">Пространство</option>
          <option value="1">Коворкинг</option>
          <option value="2">Бизнес-центр</option>
        </Select>

        <ImageUploader name={ 'imageUrls' }
                       label={ 'Открыть галерею' }
                       top={ 'Добавить фото' }/>

        <Textarea top="Описание площадки" name={ 'description' }/>

        <Input type="text"
               top="Адрес площадки"
               name='address'
               placeholder="Введите адрес площадки"/>

        <Input type="text"
               name={ 'phone' }
               top="Телефон для связи"
               placeholder="Введите телефон"/>

        <FormLayoutGroup top="Дни работы площадки">
          <Checkbox name={ 'workDays' } value={ 1 } defaultChecked={ true }>Понедельник</Checkbox>
          <Checkbox name={ 'workDays' } value={ 2 } defaultChecked={ true }>Вторник</Checkbox>
          <Checkbox name={ 'workDays' } value={ 3 } defaultChecked={ true }>Среда</Checkbox>
          <Checkbox name={ 'workDays' } value={ 4 } defaultChecked={ true }>Четверг</Checkbox>
          <Checkbox name={ 'workDays' } value={ 5 } defaultChecked={ true }>Пятница</Checkbox>
          <Checkbox name={ 'workDays' } value={ 6 }>Суббота</Checkbox>
          <Checkbox name={ 'workDays' } value={ 7 }>Воскресенье</Checkbox>
        </FormLayoutGroup>

        <FormLayoutGroup
          top="Дни работы площадки"
          className="l-time-range">
          <Input className='l-time-range__input' type="time" defaultValue="09:00" name='startWorkTime'/>
          <Input className='l-time-range__input' type="time" defaultValue="20:00" name={ 'endWorkTime' }/>
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

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    createSpace,
  }, dispatch);
}
