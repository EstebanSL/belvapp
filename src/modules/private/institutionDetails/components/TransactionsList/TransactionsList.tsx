/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'

// Custom components
import useFetchAndLoad from '../../../../../hooks/useFetch'
import { Loader } from '../../../../../components/loader/Loader'
import { Transactions } from '../Transactions/Transactions'

// third party libraries
import { format } from 'date-fns'
import { Button } from '@mui/material'

// Services and models
import { getTransactions } from '../../services/transactions.service'

// Styles
import './TransactionsList.styles.scss'
import { LinkContext } from '../../../../../context/linkContext'
import { Transaction } from '../../models/Transaction.model'

export const TransactionsList = (): JSX.Element => {

  // Variables declarations
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([])
  const [dateRange, setDateRange] = useState({
    to: format(new Date(), 'yyyy-MM-dd'),
    from: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd')
  })
  const { link } = useContext(LinkContext)
  const { loading, callEndpoint } = useFetchAndLoad()

  // Functions
  const getApiData = async (): Promise<Transaction[]> => await callEndpoint(getTransactions(link.id, {
    date_from: dateRange.from,
    date_to: dateRange.to
  }))

  const changeDateRange = (event: React.ChangeEvent<HTMLInputElement>, type: string): void => {
    setDateRange({
      ...dateRange,
      [type]: event.target.value
    })
  }

  const searchTransactions = (): void => {
    if (!verifyDates()) return
    getApiData()
      .then((data: Transaction[]) => { setTransactionsList(data) })
      .catch((error) => { console.log(error) })
  }

  const verifyDates = (): boolean => {
    if ((dateRange.from.length === 0) || (dateRange.to.length === 0)) {
      console.log('debe ingresar ambas fechas')
      return false
    }
    const date1 = new Date(dateRange.from).getTime()
    const date2 = new Date(dateRange.to).getTime()
    if (date2 < date1) {
      console.log('La fecha de inicio no puede ser menor a la fecha final ')
      return false
    }
    return true
  }

  useEffect(() => {
    getApiData()
      .then((data) => {
        setTransactionsList(data)
      })
      .catch((error) => { console.log(error) })
  }, [])


  // templates
  if (loading) {
    return (<div className='transactions-loaderCont'>
      <Loader />
    </div>)
  }

  return (
    <div className='transactions-container'>
      <h1>All transactions</h1>
      <div className="transactions-inputs">
        <label htmlFor="from">From</label>
        <input type="date" id='from' value={dateRange.from} onChange={(e) => { changeDateRange(e, 'from') }} />
        <label htmlFor="to">To</label>
        <input type="date" id='to' value={dateRange.to} onChange={(e) => { changeDateRange(e, 'to') }} />
        <Button variant='contained' color='primary' type='button' onClick={() => { searchTransactions() }}>Search New Range</Button>
      </div>

      <Transactions transactionsList={transactionsList} />
    </div>
  )
}