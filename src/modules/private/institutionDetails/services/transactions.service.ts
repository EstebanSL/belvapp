import authFetch from '../../../../interceptor/Interceptor'
import { type ServiceResponse } from '../../../../models/axiosCall.model'
import { loadAbort } from '../../../../utilities/load-abort-axios.utility'
import { Transaction } from '../models/Transaction.model'

const apiUrl = 'https://sandbox.belvo.com/api'

const transactionsURL = apiUrl + '/transactions'

export const getTransactions = (link: string, body: any): ServiceResponse<Transaction[]> => {
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
