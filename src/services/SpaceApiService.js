import axios from 'axios';

import { environment } from '../config/environment';

export class SpaceApiService {
  static getAll ({ filter } = {}) {
    return axios.get(`${environment.apiUrl}/api/spaces`, {
      params: filter,
    })
      .then((response) => {
        return response.data;
      });
  }

  static getMy ({ filter } = {}) {
    return axios.get(`${environment.apiUrl}/api/spaces/my`, {
      params: filter,
    })
      .then((response) => {
        return response.data;
      });
  }

  static get (id) {
    return axios.get(`${environment.apiUrl}/api/space/${id}`)
      .then(response => {
        return response.data;
      });
  }

  static create (data) {
    return axios.post(`${environment.apiUrl}/api/space`, data)
      .then(response => {
        return response.data;
      });
  }

  static update (id, data) {
    return axios.put(`${environment.apiUrl}/api/space/${id}`, data)
      .then(response => {
        return response.data;
      });
  }


  static remove (id) {
    return axios.delete(`${environment.apiUrl}/api/space/${id}`)
      .then(response => {
        return response.data;
      });
  }
}
