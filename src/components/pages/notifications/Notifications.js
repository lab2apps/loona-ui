import React from 'react';
import { PanelHeader, Gallery, Button, View, Panel } from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationList } from '../../notifications/notifications-list/NotificationList';
import { NotificationsApiService } from '../../../services/NotificationsApiService';

@withRouter
export class Notifications extends React.PureComponent {

  state = {
    notifications: []
  };

  getNotifications () {
    return NotificationsApiService.getAll()
      .then((notifications)=>{
        this.setState({notifications})
      })
      .catch((error)=>{
        console.warn('get notifications error',error)
      })
  }

  componentDidMount () {
    this.getNotifications();
  }


  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Уведомления
        </PanelHeader>

        <NotificationList notifications={ this.state.notifications } />
      </React.Fragment>
    );
  }
}
//
//function mapDispatchToProps (dispatch) {
//  return bindActionCreators({ hideOnBoarding }, dispatch);
//}
