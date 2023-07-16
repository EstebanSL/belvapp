import { type AxiosResponse } from 'axios'

export interface AxiosCall<T> {
  call: Promise<AxiosResponse<T>>
  controller?: AbortController
}

export interface ServiceResponse<T> {
  call: Promise<AxiosResponse<T, T>>
  controller: AbortController
}
