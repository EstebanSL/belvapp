import authFetch from '../../../../interceptor/Interceptor'
import { type ServiceResponse } from '../../../../models/axiosCall.model'
import { loadAbort } from '../../../../utilities/load-abort-axios.utility'
import { AccountDetails } from '../models/Account.model'

const apiUrl = 'https://sandbox.belvo.com/api'

const accountsURL = apiUrl + '/accounts'

export const getAccounts = (link: string): ServiceResponse<AccountDetails> => {
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
