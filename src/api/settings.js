import axios from '@/api/axios'

const getSettings = () =>
  axios.get('settings/').then((response) => response.data)

const updateSettings = (settings) =>
  axios
    .put('settings/save/', {settings: settings})
    .then((response) => response.data)

const resetOrdinalNumber = () => axios.patch('settings/reset-ordinal-number/').then(response => response.data)

export default {
  getSettings,
  updateSettings,
  resetOrdinalNumber
}
