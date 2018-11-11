import axios from 'axios';

import { environment } from '../config/environment';

export class NotificationsApiService {
  static getAll () {
    return axios.get(`${environment.apiUrl}/api/notifications`)
      .then((response) => {
        console.log('response', response);
        return response.data.map((responseItem) => {
          const payload = JSON.parse(responseItem.payload) || {};
          const room = JSON.parse(payload.room) || {};
          const space = JSON.parse(payload.space) || {};
          const user = JSON.parse(payload.user) || {};
          const message = payload.message || '';

          return {
            ...responseItem,
            room,
            space,
            user,
            message,
          }
        });
      });
  }

}
