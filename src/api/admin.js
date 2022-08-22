import axios from 'axios'

const getApplicants = ({category, page, pageSize, filter, searchString, sorting}) => {
  return axios.get(
      `${category}/?page=${page}&page_size=${pageSize}`,
      {
        params: {
          page: page,
          page_size: pageSize,
          filter: filter,
          search_string: searchString,
          sorting: sorting
        }
      }
    )
}

const getApplicationsList = ({page, pageSize, filter, searchString, sorting}) => {
  return axios.get(
      `get-list`,
      {
        params: {
          page: page,
          page_size: pageSize,
          filter: filter,
          search_string: searchString,
          sorting: sorting
        }
      }
  )
}

const getApplicationsListByCategory = ({category, page, pageSize, filter, searchString, sorting}) => {
  return axios.get(
      `by-category/`,
      {
        params: {
          category: category,
          page: page,
          page_size: pageSize,
          filter: filter,
          search_string: searchString,
          sorting: sorting
        }
      }
  )
}

const setStatus = ({type, applicationId, status, data}) => {
  return axios.patch('set_status/', {
    application_id: applicationId,
    status: status,
    type: type,
    data: data
  })
}

const deleteApplication = ({type, applicationId}) => {
  return axios.patch(`${applicationId}/delete/`, {
    application_id: applicationId,
    type: type,
  })
}

const restoreApplication = ({type, applicationId}) => {
  return axios.patch(`${applicationId}/restore/`, {
    application_id: applicationId,
    type: type,
  })
}

const getApplicationStatuses = () => {
  return [
    {
      id: 0,
      name_ru: 'На рассмотрении',
    },
    {
      id: 1,
      name_ru: 'Одобрено',
    },
    {
      id: 2,
      name_ru: 'Отказано',
    },
  ]
}

const getSettlementStatuses = () => {
  return [
    {
      id: 0,
      name_ru: 'Не вселён',
    },
    {
      id: 1,
      name_ru: 'Вселён',
    },
    {
      id: 2,
      name_ru: 'Выселен',
    },
  ]
}

const getReport = (applicationsIds) => {
  return axios.get('get-report/', {
    responseType: 'blob',
    params: {
      applications_ids: applicationsIds.join(','),
    },
  })
}

const getReportAll = ({category, filters, searchString}) => {
  return axios.get('get-report-all/', {
    responseType: 'blob',
    params: {
      category: category,
      filter: filters,
      search_string: searchString,
    }
  })
}

const getApplication = (application_id) => {
  return axios.get(`${application_id}/get_application/`, {
    responseType: 'blob',
    params: {
      application_id: application_id,
    },
  })
}

const getFilterData = () =>
  axios.get('get_filter_data/').then((response) => response.data)

export default {
  getApplicationsListByCategory,
  getApplicationsList,
  getApplicants,
  setStatus,
  deleteApplication,
  restoreApplication,
  getApplicationStatuses,
  getSettlementStatuses,
  getReport,
  getReportAll,
  getApplication,
  getFilterData,
}
