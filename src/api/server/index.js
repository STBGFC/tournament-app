import axios from 'axios'

export default {
  async fetchResults () {
    const response = await axios.get('/results');
    return response.data;
  }
}
