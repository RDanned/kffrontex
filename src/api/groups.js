import axios from '@/api/axios'

const getGroups = () => axios.get('groups/').then((response) => response.data)

export default {
  getGroups,
}
