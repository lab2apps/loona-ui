import React from 'react';
import { List } from '@vkontakte/vkui';
import { NotificationListItem } from '../notification-list-item/NotificationListItem';

type NotificationListProps = {
  notifications: any[];
}

export class NotificationList extends React.PureComponent<NotificationListProps> {
  render () {
    return (
      <List>
        { this.props.notifications.map((item, i) => {
          return <NotificationListItem key={ i } notification={ item }/>;
        }) }
      </List>
    );
  }
}
