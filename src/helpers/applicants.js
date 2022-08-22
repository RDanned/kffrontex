//depreciated
export const getFilteredApplications = ({filter, applications}) => {
  let output = applications

  if (filter.length) {
    if (output.length) {
      output = output.filter((application) => {
        let isPass = []

        filter.map((item) => {
          switch (item.by) {
            case 'payment_method':
              if (application.payment_method.id == item.value) isPass.push(true)
              break
            case 'application_status':
              if (application.status == item.value) isPass.push(true)
              break
            case 'settlement_status':
              if (application.settlement.status == item.value) isPass.push(true)
              break
            case 'study_place':
              if (application.study_place.id == item.value) isPass.push(true)
              break
            case 'social_status':
              if (
                application.social_status &&
                application.social_status.id == item.value
              )
                isPass.push(true)
              break
          }
        })

        return isPass.length == filter.length
      })
    }
  }

  return output
}

//depreciated
export const getSortedApplications = ({sort, applications}) => {
  let output = applications

  if (applications.length) {
    output = output.sort((app1, app2) => {
      if (sort.by === 'id') {
        if (sort.direction == 'desc') {
          if (app1.id > app2.id) return 1
          else return -1
        } else if (sort.direction == 'asc') {
          if (app1.id > app2.id) return -1
          else return 1
        }
      } else if (sort.by === 'full_name') {
        if (sort.direction == 'desc') {
          if (app1.full_name < app2.full_name) return 1
          else return -1
        }
        if (sort.direction == 'asc') {
          if (app1.full_name < app2.full_name) return -1
          else return 1
        }
      } else if (sort.by === 'application_status') {
        if (sort.direction == 'desc') {
          if (app1.status < app2.status) return 1
          else return -1
        }
        if (sort.direction == 'asc') {
          if (app1.status < app2.status) return -1
          else return 1
        }
      }
    })
  }

  return output
}

//depreciated
export const isInApplicants = (application) => {
  return (
    !application.deleted &&
    ((application.status == 0 && application.settlement.status == 0) ||
      (application.status == 1 && application.settlement.status == 0))
  )
}

//depreciated
export const isInSettlement = (application) => {
  return (
    !application.deleted &&
    application.status == 1 &&
    application.settlement.status == 1
  )
}

//depreciated
export const isInBasket = (application) => {
  return application.deleted || application.status == 2
}

//depreciated
export const isInEvicted = (application) => {
  return !application.deleted && application.settlement.status == 2
}


//depreciated
export const isIn = (category, application) => {
  switch (category) {
    case 'applications':
      return (
        !application.deleted &&
        //application.status == 0 &&
        application.settlement.status == 0
        /*((application.status == 0 && application.settlement.status == 0) ||
          (application.status == 1 && application.settlement.status == 0))*/
      )

    case 'settlement':
      return (
        !application.deleted && application.settlement.status == 1
        /*application.status == 1 &&
        application.settlement.status == 1*/
      )

    case 'evicted':
      return !application.deleted && application.settlement.status == 2

    default:
      return false
  }
}

export const printFile = (file, name) => {
  const url = window.URL.createObjectURL(new Blob([file]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
  link.remove()
}