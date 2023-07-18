import { useContext, useEffect, useState } from 'react'

// Custom components
import useFetchAndLoad from '../../../hooks/useFetch'
import { formatter } from '../../../utilities/formatter-currencies'
import { Transactions } from '../institutionDetails/components/Transactions/Transactions'
import { Loader } from '../../../components/loader/Loader'

// Third party libraries
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { format } from 'date-fns'

// Services and models
import { getAccountDetails } from './services/accounts.service'
import { getTransactions } from '../institutionDetails/services/transactions.service'

// Styles
import './AccountDetails.styles.scss'
import { LinkContext } from '../../../context/linkContext'

interface AccountDetailsTypes {
  status: string
  value: any
}

export const AccountDetails = (): JSX.Element => {

  // Variables declarations
  const navigate = useNavigate()
  const { id } = useParams()
  const { link } = useContext(LinkContext)
  const [loading, setLoading] = useState(true)
  const { accountId } = useParams()
  const [accountData, setAccountData] = useState<any>({
    accountInfo: null,
    transactions: []
  })
  const { callEndpoint } = useFetchAndLoad()

  // Functions
  const getApiData = async (): Promise<any> => await Promise.allSettled([
    callEndpoint(getAccountDetails(accountId!)),
    callEndpoint(getTransactions(accountId!, {
      date_to: format(new Date(), 'yyyy-MM-dd'),
      date_from: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'),
      account: accountId,
      link: link.id
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

  // Template
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
