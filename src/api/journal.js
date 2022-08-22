import axios from '@/api/axios'

const getJournal = () => axios.get('journal/').then((response) => response.data)

export default {
  getJournal,
}
