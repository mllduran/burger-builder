import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-b59f2.firebaseio.com/'
});

export default instance;
