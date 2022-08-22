import applicationApi from '@/api/application'

const state = {
  data: null,
}

export const mutationTypes = {
  getApplication: '[application] Get application mutation',
}

export const actionTypes = {
  getApplication: '[application] Get application',
}

const mutations = {
  [mutationTypes.getApplication](state, payload) {
    state.data = payload.application
  },
}

const actions = {
  [actionTypes.getApplication](context, {id}) {
    return new Promise((resolve) => {
      applicationApi.getApplication(id).then((application) => {
        context.commit(mutationTypes.getApplication, {application})
        resolve(application)
      })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
