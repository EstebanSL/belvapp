import authFetch from '../../../interceptor/Interceptor';
import { loadAbort } from '../../../utilities/load-abort-axios.utility';

const apiUrl = 'https://belvapp.onrender.com';

const loginURL = apiUrl + '/auth/login';

export const LoginUser = (value: any): any => {
  const controller = loadAbort();
  return {
    call: authFetch.post(loginURL, value, {
      signal: controller.signal,
    }),
    controller
  };
};
