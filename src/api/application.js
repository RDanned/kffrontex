import axios from 'axios'

const getApplication = (id) => {
  return axios.get(`applications/${id}/`)
}

const updateApplication = (id, applicationData) => {
  return axios
    .patch(`${id}/update/`, {data: applicationData})
    .then((response) => response.data)
}

const uploadFile = (id, fileData) => {
  return axios
      .post(
        `${id}/upload/`,
        fileData,
        {
          headers: {
          'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then((response) => response.data)
}

export default {
  getApplication,
  updateApplication,
  uploadFile
}
