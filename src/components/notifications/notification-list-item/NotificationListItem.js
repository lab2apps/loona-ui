import React from 'react';
import {
  Cell,
  Avatar,
  Link as LinkVk,
} from '@vkontakte/vkui';
import { Link, withRouter } from 'react-router-dom';
import { environment } from '../../../config/environment';
import moment from 'moment';

type User = {
  firstName: string,
  id: string,
  lastName: string,
  sex: string,
  signedId: string,
}

type NotificationItem = {
  uuid: string,
  type: string,
  timestamp: string,
  vkUser: User,
  user: User,
  room: {
    bookingType: string,
    description: string,
    floor: string,
    footage: string,
    imageUrls: string,
    name: string,
    options: string[],
    price: number,
    rentType: string,
    roomType: string,
    uuid: string,
  },
  space: {
    address: string,
    description: string,
    endWorkTime: string,
    imageUrls: string[] | null,
    latitude: number,
    longitude: number,
    name: string,
    phone: string,
    startWorkTime: string,
    type: string,
    uuid: string,
    vkLink: string,
    workDays: string[],
  },
  message: string
}

type NotificationListItemProps = {
  notification: NotificationItem
}

const NOTIFICATION_TYPES_TO_TEMPLATES = {
  USER_ORDER_CREATED: (n) => {
    return <React.Fragment>
      <Link to={getSpaceLinkUrl(n)}>{n.space.name}</Link>: заявка на бронирование места <Link to={getRoomLinkUrl(n)}>{n.room.name}</Link> создана
    </React.Fragment>
  },
  USER_ORDER_PAYED: (n) => {
    return <React.Fragment>
      <Link to={getSpaceLinkUrl(n)}>{n.space.name}</Link>: заявка на бронирование места <Link to={getRoomLinkUrl(n)}>{n.room.name}</Link> одобрена
    </React.Fragment>
  },
  USER_ORDER_FAILED: (n) => {
    return <React.Fragment>
      <Link to={getSpaceLinkUrl(n)}>{n.space.name}</Link>: заявка на бронирование места <Link to={getRoomLinkUrl(n)}>{n.room.name}</Link> отклонена
    </React.Fragment>
  },
  OWNER_ORDER_CREATED: (n) => {
    return <React.Fragment>
      <Link to={getSpaceLinkUrl(n)}>{n.space.name}</Link>: получен запрос на бронирование места <Link to={getRoomLinkUrl(n)}>{n.room.name}</Link>
    </React.Fragment>
  },
  OWNER_ORDER_PAYED: (n) => {
    return <React.Fragment>
      <Link to={getSpaceLinkUrl(n)}>{n.space.name}</Link>: забронировано и оплачено место <Link to={getRoomLinkUrl(n)}>{n.room.name}</Link>
    </React.Fragment>
  },
  OWNER_ORDER_FAILED: (n) => {
    return <React.Fragment>
      <Link to={getSpaceLinkUrl(n)}>{n.space.name}</Link>: бронь на место <Link to={getRoomLinkUrl(n)}>{n.room.name}</Link> отменена
    </React.Fragment>
  },
  ORDER_SYSTEM_INVALIDATION: (n) => {
    return <React.Fragment>
      <Link to={getSpaceLinkUrl(n)}>{n.space.name}</Link>: заявка на бронирование места <Link to={getRoomLinkUrl(n)}>{n.room.name}</Link> устарела
    </React.Fragment>
  },
  NEW_ROOM_ADDED: (n) => {
    return <React.Fragment>
      <Link to={getSpaceLinkUrl(n)}>{n.space.name}</Link>: на площадке добавлено новое место <Link to={getRoomLinkUrl(n)}>{n.room.name}</Link>
    </React.Fragment>
  },
  MESSAGE_SPACE_FOLLOWERS: (n) => {
    return <React.Fragment>
      <Link to={getSpaceLinkUrl(n)}>{n.space.name}</Link>: {n.message}
    </React.Fragment>
  },
};

@withRouter
export class NotificationListItem extends React.PureComponent<NotificationListItemProps> {

  componentDidMount () {
    console.warn('notification', this.props.notification);
  }

  render () {
    return (
      <Cell before={<Avatar src={this.getImageUrl(this.props.notification)}/>}
            multiline
            className="l-notification-item"
            description={<React.Fragment>
              <div>{this.buildTimeText(this.props.notification)}</div>
            </React.Fragment>}>
        {this.buildNotificationText(this.props.notification)}
      </Cell>
    );
  }

  buildNotificationText (notification) {
    return NOTIFICATION_TYPES_TO_TEMPLATES[notification.type](notification);
  }

  buildTimeText (notification) {
    const momentObj = moment(notification.timestamp);
    console.log(momentObj);
    return momentObj.fromNow();
  }

  getImageUrl (notification) {
    const imageId = (notification.room.imageUrls && notification.room.imageUrls[0]) ||
      (notification.space.imageUrls && notification.space.imageUrls[0]);

    return imageId ? `${environment.apiUrl}/image/${imageId}` : null;
  }
}

function getSpaceLinkUrl (notification) {
  return `/my/space-details?id=${notification.space.uuid}`;
}

function getRoomLinkUrl (notification) {
  return `/my/room-details?id=${notification.room.uuid}`;
}
