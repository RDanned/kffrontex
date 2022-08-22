import groupApi from '@/api/groups'

const state = {
  groups: [],
}

export const mutationTypes = {
  setGroups: '[groups] Set groups',
}

export const actionTypes = {
  loadGroups: '[groups] Load groups',
}

const mutations = {
  [mutationTypes.setGroups](state, payload) {
    state.groups = payload.groups
  },
}

const actions = {
  [actionTypes.loadGroups](context) {
    groupApi
      .getGroups()
      .then((groups) => context.commit(mutationTypes.setGroups, {groups}))
  },
}

export default {
  state,
  mutations,
  actions,
}
