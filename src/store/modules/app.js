import adminApi from '@/api/admin'
import applicationApi from '@/api/application'

const state = {
  globalLoading: false
}

export const mutationTypes = {
  setGlobalLoading: '[admin] Set global loading mutation'
}

export const actionTypes = {
  setGlobalLoading: '[admin] Set global loading action',
}

const mutations = {
  [mutationTypes.setGlobalLoading](state, payload){
    state.globalLoading = payload.loading
  },
}

const actions = {
  [actionTypes.setGlobalLoading](context, {loading}){
    context.commit(mutationTypes.setGlobalLoading, {loading: loading})
  },
}

export default {
  state,
  actions,
  mutations,
}
