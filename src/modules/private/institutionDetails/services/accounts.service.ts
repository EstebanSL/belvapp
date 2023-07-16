import authFetch from '../../../../interceptor/Interceptor'
import { type ServiceResponse } from '../../../../models/axiosCall.model'
import { loadAbort } from '../../../../utilities/load-abort-axios.utility'

const apiUrl = 'https://sandbox.belvo.com/api'

const accountsURL = apiUrl + '/accounts'

export const getAccounts = (link: string): ServiceResponse<any> => {
  const controller = loadAbort()
  return {
    call: authFetch.post(accountsURL, {
      link
    }, {
      signal: controller.signal
    }),
    controller
  }
}
