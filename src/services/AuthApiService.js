import axios from 'axios';

import { environment } from '../config/environment';

export class AuthApiService {
  static getToken (data) {
    return axios.post(`${environment.apiUrl}/authentication`, data)
      .then((response) => {
        return response.data;
      });
  }
}
