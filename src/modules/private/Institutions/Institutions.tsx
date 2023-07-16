/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from 'react'
import { InstitutionCard } from './components/InstitutionCard/InstitutionCard'
import './Institutions.styles.scss'
import { Loader } from '../../../components/loader/Loader'
import { getInstitutions } from './services/institutions.service'

import useFetchAndLoad from '../../../hooks/useFetch'

export const Institutions = (): JSX.Element => {
  const { loading, callEndpoint } = useFetchAndLoad()
  const [institutionsList, setinstitutionsList] = useState([])
  const [filteredInstitutions, setFilteredInstitutions] = useState([])

  const getApiData = async (): Promise<any> => await callEndpoint(getInstitutions())

  let inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    var lowerCase = e.target.value.toLowerCase();
    const filteredData = institutionsList.filter((el: any) => {
      //if no input the return the original
      if (lowerCase === '') {
        return el;
      }
      else {
        return el.display_name.toLowerCase().includes(lowerCase)
      }
    })
    setFilteredInstitutions(filteredData)
  };

  useEffect(() => {
    getApiData()
      .then((data) => { setinstitutionsList(data.results); setFilteredInstitutions(data.results) })
      .catch((error) => { console.log(error) })
  }, [])

  if (loading) {
    console.log('Loading');

    return (
      <div className='loaderCont'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='institutions-container'>
      <h1>Institutions list</h1>
      <input className='institutions-input' type="text" onChange={inputHandler} placeholder='Search institution' />
      <div className='InstitutionsList'>
        {filteredInstitutions.map((institution: any) =>
          <InstitutionCard institutionData={institution} key={institution.id} />
        )}
      </div>
    </div>
  )
}
