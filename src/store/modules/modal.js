const state = {
  applicationDetail: null,
  evictApplication: null
}

export const mutationTypes = {
  setApplicationDetail: '[modal] Set application detail mutation',
  setEvictApplication: '[modal] Set application evict mutation'
}

export const actionTypes = {
  setApplicationDetail: '[modal] Set application detail action',
  resetApplicationDetail: '[modal] Reset evict application detail action',
  setEvictApplication: '[modal] Set evict application evict action',
  resetEvictApplication: '[modal] Reset evict application evict action'
}

const mutations = {
  [mutationTypes.setApplicationDetail](state, payload) {
    state.applicationDetail = payload.application
  },
  [mutationTypes.setEvictApplication](state, payload) {
    state.evictApplication = payload.application
  }
}

const actions = {
  [actionTypes.setApplicationDetail](context, {application}) {
    context.commit(mutationTypes.setApplicationDetail, {application})
  },
  [actionTypes.resetApplicationDetail](context) {
    context.commit(mutationTypes.setApplicationDetail, {application: null})
  },
  [actionTypes.setEvictApplication](context, {application}) {
    context.commit(mutationTypes.setEvictApplication, {application})
  },
  [actionTypes.resetEvictApplication](context) {
    context.commit(mutationTypes.setEvictApplication, {application: null})
  }
}

export default {
  state,
  actions,
  mutations
}
