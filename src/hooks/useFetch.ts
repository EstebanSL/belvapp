/* eslint-disable react-hooks/exhaustive-deps */
import { type AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { type AxiosCall } from '../models/axiosCall.model'

const useFetchAndLoad = (): { loading: boolean, callEndpoint: (axiosCall: AxiosCall<any>) => Promise<any> } => {
  const [loading, setLoading] = useState(false)
  let controller: AbortController | undefined

  const callEndpoint = async (axiosCall: AxiosCall<any>): Promise<any> => {
    if (axiosCall.controller !== null) controller = axiosCall.controller
    setLoading(true)
    let result: AxiosResponse<any, any> | any = {}
    try {
      result = await axiosCall.call
    } catch (err: any) {
      setLoading(false)
      throw err
    }

    setLoading(false)
    return result?.data
  }

  const cancelEndpoint = (): void => {
    setLoading(false)
    controller?.abort()
  }

  useEffect(() => {
    return () => {
      cancelEndpoint()
    }
  }, [])

  return { loading, callEndpoint }
}

export default useFetchAndLoad
