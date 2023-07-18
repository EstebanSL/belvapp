import authFetch from '../../../interceptor/Interceptor'
import { BackendResponse } from '../../../models/Backendresponse.model'
import { ServiceResponse } from '../../../models/axiosCall.model'
import { loadAbort } from '../../../utilities/load-abort-axios.utility'
import { Inputs } from '../register/models/register.model'

const apiUrl = 'https://belvapp.onrender.com'

const registerURL = apiUrl + '/auth/register'

export const RegisterUser = (value: Inputs): ServiceResponse<BackendResponse> => {
  const controller = loadAbort()
  return {
    call: authFetch.post(registerURL, value, {
      signal: controller.signal
    }),
    controller
  }
}
