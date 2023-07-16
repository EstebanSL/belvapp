import authFetch from '../../../../interceptor/Interceptor'
import { loadAbort } from '../../../../utilities/load-abort-axios.utility'
import { type ServiceResponse } from '../../../../models/axiosCall.model'

const apiUrl = 'https://sandbox.belvo.com/api'

const institutionsURL = apiUrl + '/links'

export const RegisterLink = (value: any): ServiceResponse<any> => {
  const controller = loadAbort()
  return {
    call: authFetch.post(institutionsURL, value, {
      signal: controller.signal
    }),
    controller
  }
}
