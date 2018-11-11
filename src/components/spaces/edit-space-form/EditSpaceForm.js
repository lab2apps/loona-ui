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
} from '@vkontakte/vkui';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSpace, removeSpace, updateSpace } from '../../../store/actions/spaceActions';
import { serialize } from '../../../utils/serialize';
import { ImageUploader } from '../../image-uploader/ImageUploader';
import { withRouter } from 'react-router-dom';

type EditSpaceFormProps = {
  spaceId?: number,
  space?: any;
}

@withRouter
@connect(null, mapDispatchToProps)
export class EditSpaceForm extends React.PureComponent<EditSpaceFormProps> {
  static defaultProps = {
    space: null,
  };

  onSubmit = (event) => {
    event.preventDefault();

    const formData = serialize(event.target);

    const promise = this.props.space ? this.props.updateSpace(this.props.spaceId, formData) : this.props.createSpace(
      formData);

    promise.then((data) => {
      if (this.props.space) {
        this.props.history.goBack();

      } else {
        this.props.history.push('/my/space-details?id=' + data);
      }

    });
  };

  remove = () => {
    this.props.removeSpace(this.props.spaceId)
      .then(() => {
        this.props.history.push('/my');
      });
  };

  render () {
    console.log(this.props.space);

    return (
      <FormLayout className="l-bg-white" onSubmit={this.onSubmit} name={'test'}>

        <Input type="text"
               top="Название площадки"
               name={'name'}
               defaultValue={this.props.space && this.props.space.name}
               placeholder="Введите название площадки"/>

        <Select top="Тип площадки"
                placeholder="Выберите тип площадки"
                defaultValue={this.props.space && this.props.space.type}
                name='type'>
          <option value="0">Пространство</option>
          <option value="1">Коворкинг</option>
          <option value="2">Бизнес-центр</option>
        </Select>

        <ImageUploader name={'imageUrls'}
                       uploadedFiles={this.props.space && this.props.space.imageUrls}
                       label={'Открыть галерею'}
                       top={'Добавить фото'}/>

        <Textarea top="Описание площадки" name={'description'}
                  defaultValue={this.props.space && this.props.space.description}/>

        <Input type="text"
               top="Адрес площадки"
               name='address'
               defaultValue={this.props.space && this.props.space.address}
               placeholder="Введите адрес площадки"/>

        <Input type="text"
               name={'phone'}
               defaultValue={this.props.space && this.props.space.phone}
               top="Телефон для связи"
               placeholder="Введите телефон"/>

        {!this.props.spaceId &&
        <FormLayoutGroup top="Дни работы площадки">
          <Checkbox name={'workDays'} value={1} defaultChecked={true}>Понедельник</Checkbox>
          <Checkbox name={'workDays'} value={2} defaultChecked={true}>Вторник</Checkbox>
          <Checkbox name={'workDays'} value={3} defaultChecked={true}>Среда</Checkbox>
          <Checkbox name={'workDays'} value={4} defaultChecked={true}>Четверг</Checkbox>
          <Checkbox name={'workDays'} value={5} defaultChecked={true}>Пятница</Checkbox>
          <Checkbox name={'workDays'} value={6}>Суббота</Checkbox>
          <Checkbox name={'workDays'} value={7}>Воскресенье</Checkbox>
        </FormLayoutGroup>
        }

        {this.props.space && (
          <FormLayoutGroup top="Дни работы площадки">
            <Checkbox name={'workDays'} value={1}
                      defaultChecked={this.props.space.workDays.includes('1')}>Понедельник</Checkbox>
            <Checkbox name={'workDays'} value={2}
                      defaultChecked={this.props.space.workDays.includes('2')}>Вторник</Checkbox>
            <Checkbox name={'workDays'} value={3}
                      defaultChecked={this.props.space.workDays.includes('3')}>Среда</Checkbox>
            <Checkbox name={'workDays'} value={4}
                      defaultChecked={this.props.space.workDays.includes('4')}>Четверг</Checkbox>
            <Checkbox name={'workDays'} value={5}
                      defaultChecked={this.props.space.workDays.includes('5')}>Пятница</Checkbox>
            <Checkbox name={'workDays'} value={6}
                      defaultChecked={this.props.space.workDays.includes('6')}>Суббота</Checkbox>
            <Checkbox name={'workDays'} value={7}
                      defaultChecked={this.props.space.workDays.includes('7')}>Воскресенье</Checkbox>
          </FormLayoutGroup>
        )}

        <FormLayoutGroup
          top="Дни работы площадки"
          className="l-time-range">
          <Input className='l-time-range__input' type="time"
                 defaultValue={(this.props.space && this.props.space.startWorkTime) || '09:00'}
                 name='startWorkTime'/>
          <Input className='l-time-range__input' type="time"
                 defaultValue={(this.props.space && this.props.space.endWorkTime) || '20:00'}
                 name={'endWorkTime'}/>
        </FormLayoutGroup>

        {!this.props.spaceId &&
        <Div className='l-text-gray'>
          После подтверждения создания площадки, она будет отправлена на модерацию, но вы можете добавлять в ней комнаты
          и пространства
        </Div>
        }

        {!this.props.spaceId &&
        <Checkbox>Согласен с <Link>правилами сервиса</Link></Checkbox>
        }

        <Button size="xl" level="primary">{this.props.spaceId ? 'Сохранить' : 'Создать площадку'}</Button>


        {this.props.spaceId &&
        <Button size="xl" level="outline"
                type='button'
                style={{ borderColor: 'transparent', color: '#E64646' }}
                onClick={this.remove}>Удалить площадку</Button>
        }

      </FormLayout>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    createSpace,
    updateSpace,
    removeSpace,
  }, dispatch);
}
