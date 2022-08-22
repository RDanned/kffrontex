import authApi from '@/api/auth'
import {clearStorage, setItem} from '@/helpers/persistanceStorage'

const state = {
  currentUser: null,
  isLoggedIn: false,
  isFailed: false,
}

export const mutationTypes = {
  loginSuccess: '[auth] Login success',
  loginFailed: '[auth] Login failed',
  setIsFailed: '[auth] setIsFailed',
  logout: '[auth] Logout',
}

const mutations = {
  //login
  [mutationTypes.loginSuccess](state, payload) {
    state.currentUser = payload.user
    state.isLoggedIn = true
    state.isFailed = false
  },
  [mutationTypes.loginFailed](state) {
    state.isFailed = true
  },
  [mutationTypes.setIsFailed](state, payload) {
    state.isFailed = payload.isFailed
  },
  [mutationTypes.logout](state) {
    state.currentUser = null
    state.isLoggedIn = false
  },
}

export const actionTypes = {
  login: '[auth] login',
  logout: '[auth] logout',
}

const actions = {
  [actionTypes.login](context, {credentials}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.setIsFailed, {isFailed: false})
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.user)
          setItem('user', response.user)
          setItem('token', response.user.token)
          setItem('permissions', response.permissions)
          resolve(response.user)
        })
        .catch(() => {
          context.commit(mutationTypes.loginFailed)
          console.log('login failed')
        })
    })
  },
  [actionTypes.logout](context) {
    clearStorage()
    context.commit(mutationTypes.logout)
  },
}

export default {
  state,
  mutations,
  actions,
}
