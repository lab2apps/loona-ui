import React from 'react';

import { LogoIcon } from '../common/Icons';

import './splash-screen.scss';

export class SplashScreen extends React.PureComponent {
  render () {
    return (
      <div className={ 'l-splash-screen' }>
        <LogoIcon className={ 'l-splash-screen__icon' }/>
      </div>
    );
  }
}
