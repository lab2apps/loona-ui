import React from 'react';
import { PanelHeader, Gallery, Button, View, Panel } from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import vkConnect from '@vkontakte/vkui-connect';

import './onboarding.scss';

import onboardingImage1 from 'images/onboard1.svg';
import onboardingImage2 from 'images/onboard2.svg';
import onboardingImage3 from 'images/onboard3.svg';


import { hideOnBoarding } from '../../../store/actions/settingsActions';
import { makeIcon } from '../../common/Icons';

const onBoardingItems = [
  {
    title: 'Аренда мест на площадках',
    description: 'Бронируйте и оплачивайте помещения в арт-пространствах, бизнес-центрах и места в коворкингах и тайм-кафе',
    image: onboardingImage1,
  },
  {
    title: 'Сдать в аренду место на площадке',
    description: 'Размещайте свободные места на своих площадках, чтобы люди могли бронировать и оплачивать аренду не выходя из ВК',
    image: onboardingImage2,
  },
  {
    title: 'Оповещения',
    description: 'Получайте оповещения внутри ВК о всех активностях на площадках, которыми вы владеете и на которые вы подписаны',
    image: onboardingImage3,
  },
];

@withRouter
@connect(null, mapDispatchToProps)
export class Onboarding extends React.PureComponent {
  ref = React.createRef();

  showNextSlide = (index) => {
    return () => {
      this.ref.current.go(index + 1);
    };
  };

  goToMainPage = () => {
    vkConnect.send("VKWebAppAllowNotifications", {});

    this.props.hideOnBoarding();
    this.props.history.replace('/');
  };

  render () {
    return (
      <View id={ '/onboarding' } activePanel='/onboarding'>
        <Panel id='/onboarding'
               className='l-onboarding l-panel l-panel--full-height'>
          <PanelHeader>
            Loona
          </PanelHeader>

          <Gallery bullets={ 'dark' }
                   ref={ this.ref }
                   className='l-onboarding__gallery'
                   style={ { height: '100%' } }>

            { onBoardingItems.map((item, index) => {
              return (
                <div className='l-onboarding__item'
                     key={ index }>

                  {makeIcon(item.image.id, 'l-onboarding__image')}

                  <div className='l-onboarding__title'>
                    { item.title }
                  </div>

                  <div className='l-onboarding__description'>
                    { item.description }
                  </div>

                  { index === (onBoardingItems.length - 1) ? (
                    <Button className='l-onboarding__btn'
                            onClick={ this.goToMainPage }
                            size='l'>
                      Начать
                    </Button>
                  ) : (
                    <Button className='l-onboarding__btn'
                            onClick={ this.showNextSlide(index) }
                            size='l'>
                      Дальше
                    </Button>
                  ) }
                </div>
              );
            }) }
          </Gallery>
        </Panel>
      </View>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ hideOnBoarding }, dispatch);
}
