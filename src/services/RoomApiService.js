import axios from 'axios';

import { environment } from '../config/environment';

export class RoomApiService {
  static getAll ({ filter } = {}) {
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

  static getOrders (roomId, fromDate, toDate) {
    return axios.get(`${environment.apiUrl}/api/order`, {
      params: {
        roomId,
        fromDate: fromDate.format('YYYY-MM-DD'),
        toDate: toDate.format('YYYY-MM-DD'),
      },
    })
      .then((response) => {
        return response.data;
      });
  }

  static confirmBooking (roomId, startRentTime, endRentTime) {
    return axios.post(`${environment.apiUrl}/api/order`, {
      roomId,
      startRentTime,
      endRentTime,
    }).then((response) => {
      return response.data;
    });
  }

  static successPayment (orderId) {
    return axios.get(`${environment.apiUrl}/api/order/${orderId}/submit`).then((response) => {
      return response.data;
    });
  }

  static failPayment (orderId) {
    return axios.get(`${environment.apiUrl}/api/order/${orderId}/fail`).then((response) => {
      return response.data;
    });
  }
}
