import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { SplashScreen } from '../../components/splash-screen/SplashScreen';
import type { RootState } from '../../store/reducers/rootReducer';

class SplashScreenRoute extends React.PureComponent {
  state = {
    delay: false,
  };

  componentDidMount () {
    if (this.state.delay) {
      setTimeout(() => {
        this.setState({
          delay: false,
        });
      }, 1000);
    }
  }

  render () {
    const Component = this.props.component;
    const props     = this.props.props;

    if (this.state.delay) {
      return <SplashScreen/>;
    }

    return <Component { ...props }/>;
  }
}

export const AppRoute = connect(mapStateToProps)(({ component: Component, user, ...restProps }) => {
  return (<Route { ...restProps }
                 render={ (props) => {
                   return <SplashScreenRoute userId={ user.id } props={ props } component={ Component }/>;
                 } }/>);
});

AppRoute.propTypes = Route.propTypes;

function mapStateToProps (state: RootState) {
  return {
    user: state.user,
  };
}
