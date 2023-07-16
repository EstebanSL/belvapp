import React, { useState, useEffect } from 'react'
import useFetchAndLoad from '../../../../../hooks/useFetch'
import { getTransactions } from '../../services/transactions.service'
import { format } from 'date-fns'

export const TransactionsList = (): JSX.Element => {
  const [transactionsList, setTransactionsList] = useState([])
  const [dateRange, setDateRange] = useState({
    to: format(new Date(), 'yyyy-MM-dd'),
    from: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd')
  })

  const { loading, callEndpoint } = useFetchAndLoad()
  const getApiData = async (): Promise<any> => await callEndpoint(getTransactions('b9753aa3-c379-42f1-b4f7-7d7d619f1e52', {
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
      .then((data) => { setTransactionsList(data) })
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

  if (loading) {
    return (<p style={{ color: '#000' }} >Loading...</p>)
  }

  return (
    <div>
      <label htmlFor="from">Desde</label>
      <input type="date" id='from' value={dateRange.from} onChange={(e) => { changeDateRange(e, 'from') }} />
      <label htmlFor="to">Hasta</label>
      <input type="date" id='to' value={dateRange.to} onChange={(e) => { changeDateRange(e, 'to') }} />
      <button type='button' onClick={() => { searchTransactions() }}>Search New Range</button>
      {transactionsList.map((transaction: any) => {
        return <p style={{ color: 'black' }} key={transaction.id}>{transaction.description}</p>
      })}
    </div>
  )
}
