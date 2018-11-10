import axios from 'axios';

import { environment } from '../config/environment';

export class RoomApiService {
  static getAll ({ filter  } = {}) {
    return axios.get(`${environment.apiUrl}/api/rooms`, {
      params: {
        ...filter,
      },
    })
      .then((response) => {
        return response.data;
      });
  }

  static get (id) {
    return axios.get(`${environment.apiUrl}/api/room/${id}`)
      .then(response => {
        return response.data;
      });
  }

  static create (data) {
    return axios.post(`${environment.apiUrl}/api/room`, data)
      .then(response => {
        return response.data;
      });
  }

  static update (id, data) {
    return axios.put(`${environment.apiUrl}/api/room/${id}`, data)
      .then(response => {
        return response.data;
      });
  }


  static remove (id) {
    return axios.delete(`${environment.apiUrl}/api/room/${id}`)
      .then(response => {
        return response.data;
      });
  }
}
