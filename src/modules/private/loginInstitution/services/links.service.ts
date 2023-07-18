import authFetch from '../../../../interceptor/Interceptor'
import { loadAbort } from '../../../../utilities/load-abort-axios.utility'
import { type ServiceResponse } from '../../../../models/axiosCall.model'
import { Link } from '../models/link.model'

const apiUrl = 'https://sandbox.belvo.com/api'

const institutionsURL = apiUrl + '/links'

export const RegisterLink = (value: any): ServiceResponse<Link> => {
  const controller = loadAbort()
  return {
    call: authFetch.post(institutionsURL, value, {
      signal: controller.signal
    }),
    controller
  }
}
