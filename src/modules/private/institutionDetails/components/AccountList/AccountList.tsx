import { useContext, useEffect, useState } from 'react'

// Custom components
import useFetchAndLoad from '../../../../../hooks/useFetch'
import { Loader } from '../../../../../components/loader/Loader'
import { formatter } from '../../../../../utilities/formatter-currencies'
import { LinkContext } from '../../../../../context/linkContext'

// Services and Models
import { getAccounts } from '../../services/accounts.service'
import { AccountDetails } from '../../models/Account.model'

// Third party libraries
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

// Assets
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SavingsIcon from '@mui/icons-material/Savings'

// Styles
import './AccountList.styles.scss'

export const AccountsList = (): JSX.Element => {

  // Variables declarations
  const [accountsList, setAccountsList] = useState<AccountDetails[]>([])
  const navigate = useNavigate()
  const { loading, callEndpoint } = useFetchAndLoad()
  const { link } = useContext(LinkContext)

  // Functions
  const getApiData = async (): Promise<AccountDetails[]> => await callEndpoint(getAccounts(link.id))

  const goToAccountDetails = (accountId: string): void => {
    navigate('account/' + accountId)
  }


  useEffect(() => {
    getApiData()
      .then((data: AccountDetails[]) => { setAccountsList(data) })
      .catch((error) => { console.log(error) })
  }, [])


  // Template
  if (loading) {
    return (<div className='accountList-loaderCont'>
      <Loader />
    </div>)
  }

  return (
    <div className='accounts-list'>
      {accountsList.map((account: AccountDetails) => {
        return (
          <div className='accounts-list__card' key={account.id}>
            <div className="card__elements">
              <div className="info">
                <span>Your balance: </span>
                <p>{formatter.format(account.balance.current)}</p>
              </div>
              {account.category === 'CREDIT_CARD'
                ? <CreditCardIcon className='icon' />
                : <SavingsIcon className='icon' />
              }
            </div>
            <Button
              variant='contained'
              color='info'
              className='info-button'
              onClick={() => { goToAccountDetails(account.id) }}
            >
              Details
            </Button>
          </div>)
      })}
    </div>
  )
}
