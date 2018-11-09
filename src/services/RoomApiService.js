import axios from 'axios';

import { environment } from '../config/environment';

export class RoomApiService {
  static getAll ({ filter = {} }) {
    return axios.get(`${environment.apiUrl}/rooms`, {
      params: filter,
    })
      .then((response) => {
        return response.data;
      });
  }

  static get (id) {
    return axios.get(`${environment.apiUrl}/rooms/${id}`)
      .then(response => {
        return response.data;
      });
  }

  static create (data) {
    return axios.post(`${environment.apiUrl}/rooms`, data)
      .then(response => {
        return response.data;
      });
  }

  static update (id, data) {
    return axios.put(`${environment.apiUrl}/rooms/${id}`, data)
      .then(response => {
        return response.data;
      });
  }


  static remove (id) {
    return axios.delete(`${environment.apiUrl}/rooms/${id}`)
      .then(response => {
        return response.data;
      });
  }
}
