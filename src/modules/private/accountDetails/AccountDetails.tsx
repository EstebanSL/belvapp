/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import useFetchAndLoad from '../../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import { getAccountDetails } from './services/accounts.service'
import { format } from 'date-fns'
import { getTransactions } from '../institutionDetails/services/transactions.service'

import './AccountDetails.styles.scss'
import { Loader } from '../../../components/loader/Loader'
import { Transactions } from '../institutionDetails/components/Transactions/Transactions'
import { Button } from '@mui/material'
import { formatter } from '../../../utilities/formatter-currencies'

interface AccountDetailsTypes {
  status: string
  value: any
}

export const AccountDetails = (): JSX.Element => {

  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const { accountId } = useParams()
  const [accountData, setAccountData] = useState<any>({
    accountInfo: null,
    transactions: []
  })

  console.log(id);

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

  const goToAccounts = () => {
    navigate(`/institution/details/${id}`)
  }

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
    return (<div className='account-loaderCont'>
      <Loader />
    </div>)
  }

  return (
    <div className='account-container'>
      <Button variant='outlined' color='error' onClick={() => goToAccounts()}>Go back</Button>
      <h2>Account details</h2>
      <hr />
      <div className="account-information">
        <p>Account name: <span>{accountData.accountInfo?.name}</span></p>
        <p>Account number: <span>{accountData.accountInfo?.number}</span></p>
        <p>Balance: <span>{formatter.format(accountData.accountInfo?.balance.current)}</span></p>
        <p>Category: <span>{accountData.accountInfo?.category}</span></p>
        <p>Opening date: <span>{new Date(accountData.accountInfo?.created_at).toLocaleString('en-CO')}</span></p>
      </div>

      <hr />
      <div className="transactions">
        <h3>Last month movements</h3>
        <Transactions transactionsList={accountData.transactions} />
      </div>

    </div>
  )
}
