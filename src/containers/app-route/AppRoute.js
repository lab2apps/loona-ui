import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

import { SplashScreen } from '../../components/splash-screen/SplashScreen';
import type { RootState } from '../../store/reducers/rootReducer';

type SplashScreenRouteProps = {
  userId: string;
  component: any;
  props: any;
  showOnBoarding: boolean;
};

@withRouter
class SplashScreenRoute extends React.Component<SplashScreenRouteProps> {
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

    if (this.props.showOnBoarding && this.props.location.pathname !== '/onboarding') {
      return <Redirect to={ '/onboarding' }/>;
    }

    return <Component { ...props } location={ this.props.location.pathname }/>;
  }
}

export const AppRoute = connect(mapStateToProps)(({ component: Component, settings, user, ...restProps }) => {
  return (<Route { ...restProps }
                 render={ (props) => {
                   return <SplashScreenRoute userId={ user.id }
                                             props={ props }
                                             location={ props.location }
                                             showOnBoarding={ settings.showOnBoarding }
                                             component={ Component }/>;
                 } }/>);
});

AppRoute.propTypes = Route.propTypes;

function mapStateToProps (state: RootState) {
  return {
    user: state.user,
    settings: state.settings,
  };
}
