import authFetch from '../../../../interceptor/Interceptor'
import { type ServiceResponse } from '../../../../models/axiosCall.model'
import { loadAbort } from '../../../../utilities/load-abort-axios.utility'

const apiUrl = 'https://sandbox.belvo.com/api'

const institutionsURL = apiUrl + '/institutions'

export const getInstitutions = (): ServiceResponse<any> => {
  const controller = loadAbort()
  return {
    call: authFetch.get(institutionsURL, {
      signal: controller.signal
    }),
    controller
  }
}
