import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  validationErrors: null,
}

export const mutationTypes = {
  //register
  sendStart: '[application-form] sendStart',
  sendSuccess: '[application-form] sendSuccess',
  sendFailed: '[application-form] sendFailed',
}

const mutations = {
  //register
  [mutationTypes.sendStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.sendSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.sendFailed](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

export const actionTypes = {
  send: '[application-form] send',
}

const actions = {
  [actionTypes.send](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.sendStart)
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.sendSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit(mutationTypes.sendFailed, result.response.data.errors)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
