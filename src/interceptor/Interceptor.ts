import axios from 'axios'

const authFetch = axios.create({
  baseURL: 'http://localhost:3001'
})

authFetch.interceptors.request.use(
  (request) => {
    console.log((process.env.REACT_APP_SECRET_ID));

    request.headers.Authorization = 'Basic ' + window.btoa(String(process.env.REACT_APP_SECRET_ID) + ':' + String(process.env.REACT_APP_SECRET_PASSWORD))
    return request
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

authFetch.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

export default authFetch
