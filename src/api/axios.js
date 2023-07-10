import axios from 'axios';
import { cocktailUrl } from '../constants/constants';

const instance = axios.create({
  baseURL: cocktailUrl,
});

export default instance;
