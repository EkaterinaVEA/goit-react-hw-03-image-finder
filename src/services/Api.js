import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class Api {
  static async getImages(searchQuery, page) {
    const API_KEY = '21740199-d7b6e81c83ae38a8fb2587200';
    const params = `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const { data } = await axios.get(params);
    return data.hits;
  }
}
