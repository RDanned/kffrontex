import axios from 'axios'
import {getItem, clearStorage} from '@/helpers/persistanceStorage'
import router from '@/router'
import host from '@/../config/host'
import { Message, Loading, Notification } from 'element-ui';

axios.defaults.baseURL = host + '/api/'

axios.interceptors.request.use((config) => {
  const token = getItem('token')
  const authorizisationToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authorizisationToken
  if(config.method === 'post' && getItem('csrftoken')){
    config.headers['X-CSRFToken'] = getItem('csrftoken')
  }
  return config
})

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (401 === error.response.status) {
      router.push({name: 'login'})
      clearStorage()
    } else {
      Notification({
        message: 'Ошибка: An error has occurred: ' + error.message,
        position: 'top-right',
        type: 'error'
      })
    }
    return Promise.reject(error)
    //return error
  }
)

export default axios
