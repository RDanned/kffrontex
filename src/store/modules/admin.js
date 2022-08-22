import adminApi from '@/api/admin'
import applicationApi from '@/api/application'
//import {actionTypes as modalActions} from '@/store/modules/modal'

const state = {
  category: '',
  data: [],
  searchString: '',
  //depreciated
  sortApplications: {
    by: 'id',
    direction: 'asc',
  },
  sorting: {
    by: 'id',
    direction: 'descending',
  },
  count: 0,
  pageSize: 50,
  page: 1,
  filter: [],
  printIds: [],
  selectedItems: [],
  needReload: false
}

export const mutationTypes = {
  setSelectedItems: '[admin] Set selected ids mutation',
  setCategory: '[admin] Set category mutation',
  setData: '[admin] Get data success mutation',
  setApplicationStatus: '[admin] Application status sat mutation',
  setSettlementStatus: '[admin] Settlement status sat mutation',
  setSearchString: '[admin] Set search string mutation',
  softDeleteApplication: '[admin] Soft delete application mutation',
  restoreApplication: '[admin] Restore softly deleted application mutation',
  setApplicationSort: '[admin] Set application sort mutation',
  setFilter: '[admin] Append filter mutation',
  setPage: '[admin] Set mage mutation',
  setSorting: '[admin] Set sorting mutation',
  setPrintIds: '[admin] Set print ids mutation',
  setPageSize: '[admin] Set page size mutation',
  clearState: '[admin] Clear state mutation',
  setNeedReload: '[admin] Set need reload mutation'
}

export const actionTypes = {
  setSelectedItems: '[admin] Set selected ids mutation action',
  setCategory: '[admin] Set category action',
  //depreciated
  getData: '[admin] Get data action',
  getDataByCategory: '[admin] Get data by action',
  getApplicationsList: '[admin] Get applications list action',
  getFilteredApplications: '[admin] Get filtered applications action',
  setApplicationStatus: '[admin] Set application status action',
  setSettlementStatus: '[admin] Set settlement status action',
  setSearchString: '[admin] Set search string action',
  softDeleteApplication: '[admin] Soft delete application action',
  restoreApplication: '[admin] Restore softly deleted application action',
  setApplicationSort: '[admin] Set application sort action',
  appendFilter: '[admin] Append filter action',
  deleteFilter: '[admin] Delete filter action',
  resetFilter: '[admin] Clear filter action',
  setPage: '[admin] Set page action',
  setSorting: '[admin] Set sorting action',
  setPrintIds: '[admin] Set print ids action',
  updateApplication: '[admin] Update application action',
  setPageSize: '[admin] Set page size action',
  clearState: '[admin] Clear state action',
  setNeedReload: '[admin] Set need reload action'
}

const mutations = {
  [mutationTypes.setNeedReload](state, payload){
    state.needReload = payload.needReload
  },
  [mutationTypes.setSelectedItems](state, payload){
    state.selectedIds = payload.selectedIds
  },
  [mutationTypes.setCategory](state, payload){
    state.category = payload.category
  },
  [mutationTypes.setSorting](state, payload){
    state.sorting.by = payload.by
    state.sorting.direction = payload.direction

    if(!payload.direction) {
      state.sorting = {
        by: 'id',
        direction: 'descending',
      }
    }
  },
  [mutationTypes.clearState](state){
    state.data = []
    state.category = ''
    state.searchString = ''
    state.sortApplications = {
      by: 'id',
      direction: 'asc',
    }
    //depreciated
    state.sorting = {
      by: 'id',
      direction: 'descending',
    }
    state.count = 0
    state.pageSize = 50
    state.page = 1
    state.filter = []
    state.printIds = []
  },
  [mutationTypes.setData](state, payload) {
    state.data = payload.items
    state.count = payload.count
  },
  [mutationTypes.setApplicationStatus](state, payload) {
    let applicationId = payload.applicationId
    let status = payload.status

    state.data.forEach((application) => {
      if (application.id === applicationId) application.status = status
    })
  },
  [mutationTypes.setSettlementStatus](state, payload) {
    let applicationId = payload.applicationId
    let status = payload.status

    state.data.forEach((application) => {
      if (application.id === applicationId) application.settlement_status = status
    })

    // depreciated
    // state.data.forEach((application) => {
    //   if (application.id == applicationId)
    //     application.settlement.status = status
    // })
  },
  [mutationTypes.setSearchString](state, payload) {
    let searchString = payload.searchString
    state.searchString = searchString
  },
  [mutationTypes.softDeleteApplication](state, payload) {
    let applicationId = payload.applicationId
    state.data.forEach((application) => {
      if (application.id == applicationId) {
        application.deleted = true
      }
    })
  },
  [mutationTypes.restoreApplication](state, payload) {
    let applicationId = payload.applicationId
    state.data.forEach((application) => {
      if (application.id == applicationId) {
        application.deleted = false
      }
    })
  },
  [mutationTypes.setApplicationSort](state, payload) {
    state.sortApplications.by = payload.by
    state.sortApplications.direction = payload.direction
  },
  [mutationTypes.setFilter](state, payload) {
    state.filter = payload.filter
  },
  [mutationTypes.setPage](state, payload) {
    state.page = payload.page
  },
  [mutationTypes.setPrintIds](state, payload) {
    state.printIds = payload.printIds
  },
  [mutationTypes.setPageSize](state, payload) {
    state.pageSize = payload.pageSize
  },
}

const actions = {
  [actionTypes.setNeedReload](context, {needReload}){
    context.commit(mutationTypes.setNeedReload, {needReload})
  },
  [actionTypes.setSelectedItems](context, {selectedIds}){
    context.commit(mutationTypes.setSelectedItems, {selectedIds})
  },
  [actionTypes.setCategory](context, {category}){
    context.commit(mutationTypes.setCategory, {category})
  },
  [actionTypes.setSorting](context, {by, direction}){
    context.commit(mutationTypes.setSorting, {by, direction})
  },
  [actionTypes.clearState](context){
    context.commit(mutationTypes.clearState)
  },
  //depreciated
  [actionTypes.getData](context, {category}) {
    let page = context.state.page
    let pageSize = context.state.pageSize
    let filter = context.state.filter
    let searchString = context.state.searchString
    let sorting = context.state.sorting

    return new Promise((resolve) => {
      adminApi.getApplicants({category, page, pageSize, filter, searchString, sorting}).then((response) => {
        context.commit(mutationTypes.setData, response.data)
        resolve(response.data)
      })
    })
  },
  [actionTypes.getDataByCategory](context) {
    let category = context.state.category
    let page = context.state.page
    let pageSize = context.state.pageSize
    let filter = context.state.filter
    let searchString = context.state.searchString
    let sorting = context.state.sorting

    return new Promise((resolve) => {
      adminApi.getApplicationsListByCategory({category, page, pageSize, filter, searchString, sorting}).then((response) => {
        context.commit(mutationTypes.setData, response.data)
        resolve(response.data)
      })
    })
  },
  [actionTypes.getApplicationsList](context){
    let page = context.state.page
    let pageSize = context.state.pageSize
    let filter = context.state.filter
    let searchString = context.state.searchString
    let sorting = context.state.sorting

    return new Promise((resolve) => {
      adminApi.getApplicationsList({page, pageSize, filter, searchString, sorting}).then((response) => {
        context.commit(mutationTypes.setData, response.data)
        resolve(response.data)
      })
    })
  },
  [actionTypes.setApplicationStatus](context, {applicationId, status, data}) {
    return new Promise((resolve) => {
      adminApi
        .setStatus({type: 'application', applicationId, status, data})
        .then(() => {
          context.commit(mutationTypes.setApplicationStatus, {
            applicationId,
            status
          })
          resolve(applicationId)
        })
    })
  },
  [actionTypes.setSettlementStatus](context, {applicationId, status, data}) {
    return new Promise((resolve) => {
      adminApi
        .setStatus({type: 'settlement', applicationId, status, data})
        .then(() => {
          context.commit(mutationTypes.setSettlementStatus, {
            applicationId,
            status
          })
          resolve(applicationId)
        })
    })
  },
  [actionTypes.setSearchString](context, {searchString}) {
    context.commit(mutationTypes.setSearchString, {searchString})
  },
  [actionTypes.softDeleteApplication](context, {applicationId}) {
    return new Promise((resolve) => {
      adminApi.deleteApplication({type: 'soft', applicationId}).then(() => {
        context.commit(mutationTypes.softDeleteApplication, {
          applicationId,
          type: 'soft',
        })
        resolve(applicationId)
      })
    })
  },
  [actionTypes.restoreApplication](context, {applicationId}) {
    return new Promise((resolve) => {
      adminApi.restoreApplication({type: 'soft', applicationId}).then(() => {
        context.commit(mutationTypes.restoreApplication, {
          applicationId,
          type: 'soft',
        })
        resolve(applicationId)
      })
    })
  },
  [actionTypes.setApplicationSort](context, {by, direction}) {
    context.commit(mutationTypes.setApplicationSort, {by, direction})
  },
  [actionTypes.deleteFilter](context, {filter}) {
    if(context.state.filter.find((item) => item.by === filter.by)){
      let newFilter = context.state.filter.filter((item) => item.by !== filter.by)

      context.commit(mutationTypes.setFilter, {
        filter: newFilter,
      })
    }
  },
  [actionTypes.appendFilter](context, {filter}) {
    let newFilter = []

    if (!context.state.filter) {
      newFilter = [...context.state.filter, filter]
    } else {
      let isNew = true

      newFilter = context.state.filter.map((item) => {
        if (item.by === filter.by) {
          item.value = filter.value
          isNew = false
        }
        return item
      })

      if (isNew) newFilter = [...context.state.filter, filter]
    }

    context.commit(mutationTypes.setFilter, {
      filter: newFilter,
    })
  },
  [actionTypes.resetFilter](context) {
    context.commit(mutationTypes.setFilter, {
      filter: [],
    })
  },
  [actionTypes.setPage](context, {page}) {
    context.commit(mutationTypes.setPage, {page})
  },
  [actionTypes.setPrintIds](context, {printIds}) {
    context.commit(mutationTypes.setPrintIds, {printIds})
  },
  [actionTypes.updateApplication](context, {application}) {
    return applicationApi
      .updateApplication(application.id, {
        ...application,
      })
      .then(() => {
        let newData = context.state.data
        newData = newData.map((applicationItem) => {
          if (applicationItem.id == application.id) {
            applicationItem = application
          }
          return applicationItem
        })
        context.commit(mutationTypes.setData, {
          items: newData,
          count: newData.length,
        })

        //update detail modal content
        //context.dispatch(modalActions.setApplicationDetail, {application})
      })
  },
  [actionTypes.setPageSize](context, {pageSize}) {
    context.commit(mutationTypes.setPageSize, {pageSize})
  },
}


export default {
  state,
  actions,
  mutations,
}
