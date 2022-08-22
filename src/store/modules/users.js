import usersApi from '@/api/users'

const state = {
  users: [],
}

export const mutationTypes = {
  setUsers: '[users] Set users',
  addUser: '[users] Add user',
  deleteUser: '[users] Delete user',
  updateUser: '[users] Update user',
}

export const actionTypes = {
  loadUsers: '[users] Load users',
  addUser: '[users] Add user',
  deleteUser: '[users] Delete user',
  updateUser: '[users] Update user',
}

const mutations = {
  [mutationTypes.setUsers](state, payload) {
    state.users = payload.users
  },
  [mutationTypes.addUser](state, payload) {
    state.users = [...state.users, payload.user]
  },
  [mutationTypes.deleteUser](state, payload) {
    state.users = state.users.filter((user) => {
      if (user.id != payload.user.id) return true
      return false
    })
  },
  [mutationTypes.updateUser](state, payload) {
    payload.user.password = ''
    payload.user.groups = payload.user.groups.map((group) => ({name: group}))
    state.users = state.users.map((user) => {
      if (user.id == payload.user.id) user = payload.user
      return user
    })
  },
}

const actions = {
  [actionTypes.loadUsers](context) {
    return usersApi
      .getUsers()
      .then((users) => context.commit(mutationTypes.setUsers, {users}))
  },
  [actionTypes.addUser](context, {user}) {
    return usersApi
      .addUser(user)
      .then(() => context.commit(mutationTypes.addUser, {user}))
  },
  [actionTypes.deleteUser](context, {user}) {
    return usersApi
      .deleteUser(user)
      .then(() => context.commit(mutationTypes.deleteUser, {user}))
  },
  [actionTypes.updateUser](context, {user}) {
    return usersApi
      .updateUser(user)
      .then(() => context.commit(mutationTypes.updateUser, {user}))
  },
}

export default {
  state,
  mutations,
  actions,
}
