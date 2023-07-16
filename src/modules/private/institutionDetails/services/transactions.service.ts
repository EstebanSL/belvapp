import authFetch from '../../../../interceptor/Interceptor'
import { type ServiceResponse } from '../../../../models/axiosCall.model'
import { loadAbort } from '../../../../utilities/load-abort-axios.utility'

const apiUrl = 'https://sandbox.belvo.com/api'

const transactionsURL = apiUrl + '/transactions'

export const getTransactions = (link: string, body: any): ServiceResponse<any> => {
  const controller = loadAbort()
  return {
    call: authFetch.post(transactionsURL, {
      link,
      ...body
    }, {
      signal: controller.signal
    }),
    controller
  }
}
