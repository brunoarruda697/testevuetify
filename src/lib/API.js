import axios from 'axios';

const API_URL = 'http://5bbcb75229214000136cc065.mockapi.io/Pessoas';

export default {
  getPessoas() {
    return axios.get(API_URL);
  },
};
