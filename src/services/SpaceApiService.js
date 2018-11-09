import axios from 'axios';

import { environment } from '../config/environment';

export class SpaceApiService {
  static getAll ({ filter = {} }) {
    return axios.get(`${environment.apiUrl}/spaces`, {
      params: filter,
    })
      .then((response) => {
        return response.data;
      });
  }

  static get (id) {
    return axios.get(`${environment.apiUrl}/spaces/${id}`)
      .then(response => {
        return response.data;
      });
  }

  static create (data) {
    return axios.post(`${environment.apiUrl}/spaces`, data)
      .then(response => {
        return response.data;
      });
  }

  static update (id, data) {
    return axios.put(`${environment.apiUrl}/spaces/${id}`, data)
      .then(response => {
        return response.data;
      });
  }


  static remove (id) {
    return axios.delete(`${environment.apiUrl}/spaces/${id}`)
      .then(response => {
        return response.data;
      });
  }
}
