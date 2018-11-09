import React from 'react';
import { PanelHeader, Gallery, Button } from '@vkontakte/vkui';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './onboarding.scss';

import onboardingImage1 from 'images/onboarding1.png';

import { hideOnBoarding } from '../../../store/actions/settingsActions';

const onBoardingItems = [
  {
    title: 'Заголовок экрана',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    image: onboardingImage1,
  },
  {
    title: 'Заголовок экрана',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    image: onboardingImage1,
  },
];

@withRouter
@connect(null, mapDispatchToProps)
export class Onboarding extends React.PureComponent {
  ref = React.createRef();

  state = {};

  showNextSlide = (index) => {
    return () => {
      this.ref.current.go(index + 1);
    };
  };

  goToMainPage = () => {
    this.props.hideOnBoarding();
    this.props.history.push('/');
    // this.setState({
    //   redirect: true,
    // });
  };

  render () {
    if (this.state.redirect) {
      return <Redirect to={ '/' }/>;
    }


    return (
      <React.Fragment>
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
                <img src={ item.image } className='l-onboarding__image'/>

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
      </React.Fragment>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ hideOnBoarding }, dispatch);
}