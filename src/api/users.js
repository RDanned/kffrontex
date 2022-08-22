import axios from '@/api/axios'

const getUsers = () => axios.get('users/').then((response) => response.data)

const addUser = (user) =>
  axios.post('users/', user).then((response) => response.data)

const deleteUser = (user) =>
  axios.delete(`users/${user.id}/`).then((response) => response.data)

const updateUser = (user) =>
  axios
    .patch(`users/${user.id}/`, {user: user})
    .then((response) => response.data)

export default {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
}
