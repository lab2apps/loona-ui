import React from 'react';

import { Div, Button, FormLayout, Select, RangeSlider, FormLayoutGroup, Checkbox } from '@vkontakte/vkui';

export class Filter extends React.PureComponent {
  state = {
    price: [],
  };

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        active: true,
      });
    }, 0);
  }

  render () {
    const className = this.state.active ? 'l-filter l-filter--active' : 'l-filter';

    return (
      <div className={className}>
        <div className='l-filter__bg' onClick={this.props.onSubmit}>
        </div>

        <Div className='l-filter__inner'>
          <FormLayout className="l-bg-white">
            <Select top="Выберите Тип Места" placeholder="Выберите тип места"
                    defaultValue={this.props.room && this.props.room.roomType}
                    name='roomType'>
              <option value="0">Комната</option>
              <option value="1">Здание</option>
              <option value="1">Стол</option>
            </Select>


            <RangeSlider top={
              <React.Fragment>
                <div className={'l-filter__range'}>
                           <span>
                           {this.state.price[0] || 0}₽
                           </span>
                  <span>
                           {this.state.price[1] || 100000}₽
                           </span>
                </div>
              </React.Fragment>
            }
                         min={0}
                         onChange={price => this.setState({ price })}
                         step={1}
                         max={100000}/>


            <FormLayoutGroup top="Доступные удобства">
              <Checkbox name={'options'} value={'1'}>Wi-Fi</Checkbox>
              <Checkbox name={'options'} value={'2'}>Кофемашина</Checkbox>
              <Checkbox name={'options'} value={'3'}>Проектор</Checkbox>
            </FormLayoutGroup>

            <Button size="xl" level="primary" onClick={this.props.onSubmit}>Показать результаты</Button>
          </FormLayout>
        </Div>
      </div>
    );
  }
}
