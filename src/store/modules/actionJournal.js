import journalApi from '@/api/journal'

const state = {
  journal: [],
  itemsCount: 0,
  pageCount: 0,
  pageSize: 20,
  currentPage: 1,
}

export const mutationTypes = {
  setJournal: '[journal] Set journal',
  setPageCount: '[journal] Set page count',
  setCurrentPage: '[journal] Set page',
  setItemsCount: '[journal] Set items count',
}

export const actionTypes = {
  loadJournal: '[journal] Load journal',
  setCurrentPage: '[journal] Set current page',
}

const mutations = {
  [mutationTypes.setJournal](state, payload) {
    state.journal = payload.journal
  },
  [mutationTypes.setPageCount](state, payload) {
    state.pageCount = payload.pageCount
  },
  [mutationTypes.setCurrentPage](state, payload) {
    state.currentPage = payload.page
  },
  [mutationTypes.setItemsCount](state, payload) {
    state.itemsCount = payload.itemsCount
  },
}

const actions = {
  [actionTypes.loadJournal](context) {
    journalApi.getJournal().then((journal) => {
      let itemsCount = journal.length
      context.commit(mutationTypes.setJournal, {journal})
      context.commit(mutationTypes.setItemsCount, {itemsCount})
      context.commit(mutationTypes.setCurrentPage, {page: 1})
      context.commit(mutationTypes.setPageCount, {
        pageCount: Math.ceil(itemsCount / context.state.pageSize),
      })
    })
  },
  [actionTypes.setCurrentPage](context, {page}) {
    context.commit(mutationTypes.setCurrentPage, {page})
  },
}

const getters = {
  getCurrentJournalPageItems: (state) => {
    return state.journal.slice(
      (state.currentPage - 1) * state.pageSize,
      (state.currentPage - 1) * state.pageSize + state.pageSize
    )
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
