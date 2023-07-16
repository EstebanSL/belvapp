import authFetch from '../../../interceptor/Interceptor';
import { loadAbort } from '../../../utilities/load-abort-axios.utility';

const apiUrl = 'https://belvapp.onrender.com';

const registerURL = apiUrl + '/auth/register';

export const RegisterUser = (value: any): any => {
  const controller = loadAbort();
  return {
    call: authFetch.post(registerURL, value, {
      signal: controller.signal,
    }),
    controller
  };
};
