import axios from 'axios';
import { environment } from '../config/environment';

export class ImageApiService {
  static uploadImage (image) {
    const formData = new FormData();
    formData.set('image', image);

    return axios.post(`${environment.apiUrl}/api/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        return response.data;
      });
  }
}
