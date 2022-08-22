import axios from '@/api/axios'

const login = (credentials) => {
  return axios.post('login/', credentials).then((response) => response.data)
}

export default {
  login,
}
