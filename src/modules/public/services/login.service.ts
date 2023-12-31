import authFetch from '../../../interceptor/Interceptor'
import { BackendResponse } from '../../../models/Backendresponse.model'
import { ServiceResponse } from '../../../models/axiosCall.model'
import { loadAbort } from '../../../utilities/load-abort-axios.utility'

const apiUrl = 'https://belvapp.onrender.com'

const loginURL = apiUrl + '/auth/login'

export const LoginUser = (value: any): ServiceResponse<BackendResponse> => {
  const controller = loadAbort()
  return {
    call: authFetch.post(loginURL, value, {
      signal: controller.signal
    }),
    controller
  }
}
