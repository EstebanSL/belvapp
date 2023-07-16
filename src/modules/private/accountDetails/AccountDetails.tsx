/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import useFetchAndLoad from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { getAccountDetails } from './services/accounts.service'
import { format } from 'date-fns'
import { getTransactions } from '../institutionDetails/services/transactions.service'

import './AccountDetails.styles.scss'
import { Loader } from '../../../components/loader/Loader'

interface AccountDetailsTypes {
  status: string
  value: any
}

export const AccountDetails = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const { accountId } = useParams()
  const [accountData, setAccountData] = useState<any>({
    accountInfo: null,
    transactions: []
  })

  const { callEndpoint } = useFetchAndLoad()

  const getApiData = async (): Promise<any> => await Promise.allSettled([
    callEndpoint(getAccountDetails(accountId!)),
    callEndpoint(getTransactions(accountId!, {
      date_to: format(new Date(), 'yyyy-MM-dd'),
      date_from: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'),
      account: accountId,
      link: 'b9753aa3-c379-42f1-b4f7-7d7d619f1e52'
    }))
  ])

  useEffect(() => {
    setLoading(true)
    getApiData()
      .then(([data1, data2]: AccountDetailsTypes[]) => {
        setAccountData({
          accountInfo: data1.value,
          transactions: data2.value
        })
        setLoading(false)
      })
      .catch((error) => { console.log(error) })
  }, [])

  if (loading) {
    return (<div className='loaderCont'>
      <Loader />
    </div>)
  }

  return (
    <div className='account-container'>
      <h2>Detalles de la cuenta</h2>
      <p style={{ color: 'blue' }}>Account name: <span>{accountData.accountInfo?.name}</span></p>
      <p style={{ color: 'blue' }}>Account number: <span>{accountData.accountInfo?.number}</span></p>
      <p style={{ color: 'blue' }}>Category: <span>{accountData.accountInfo?.category}</span></p>

    </div>
  )
}
