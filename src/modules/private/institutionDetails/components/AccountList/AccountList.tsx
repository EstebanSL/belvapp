import { useEffect, useState } from 'react'
import { getAccounts } from '../../services/accounts.service'
import useFetchAndLoad from '../../../../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import './AccountList.styles.scss'
import { Button } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SavingsIcon from '@mui/icons-material/Savings'
import { Loader } from '../../../../../components/loader/Loader'

export const AccountsList = (): JSX.Element => {
  const [accountsList, setAccountsList] = useState([])

  const navigate = useNavigate()

  const { loading, callEndpoint } = useFetchAndLoad()
  const getApiData = async (): Promise<any> => await callEndpoint(getAccounts('b9753aa3-c379-42f1-b4f7-7d7d619f1e52'))

  const goToAccountDetails = (accountId: string): void => {
    navigate('account/' + accountId)
  }

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MEX'
  })

  useEffect(() => {
    getApiData()
      .then((data) => { setAccountsList(data) })
      .catch((error) => { console.log(error) })
  }, [])

  if (loading) {
    return (<div className='loaderCont'>
      <Loader />
    </div>)
  }

  return (
    <div className='accounts-list'>
      {accountsList.map((account: any) => {
        return (
          <div className='accounts-list__card' key={account.id}>
            <div className="card__elements">
              <div className="info">
                <span>Your balance: </span>
                <p>{formatter.format(account.balance.current)}</p>
              </div>
              {account.category === 'CREDIT_CARD' ? <CreditCardIcon className='icon' /> : <SavingsIcon className='icon' />}
            </div>
            <Button variant='contained' color='info' className='info-button' onClick={() => { goToAccountDetails(account.id) }}>Details</Button>
          </div>)
      })}
    </div>
  )
}
