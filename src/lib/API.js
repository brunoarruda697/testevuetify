import axios from 'axios';

const API_URL = 'http://5bbcb75229214000136cc065.mockapi.io/Pessoas';

export default {
  getPeople() {
    return axios.get(API_URL);
  },
  deletePeople(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
  editPeople(id, payload) {
    return axios.put(`${API_URL}/${id}`, payload);
  },
  newRegister(payload) {
    return axios.post(API_URL, payload);
  },
};
