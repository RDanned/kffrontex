import axios from 'axios'

const getFormData = () => {
  return axios.get('form_data/')
}

const send = (data) => {
  return axios.post('send/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export default {
  getFormData,
  send,
}
