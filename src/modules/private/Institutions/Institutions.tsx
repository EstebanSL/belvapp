/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { InstitutionCard } from './components/InstitutionCard/InstitutionCard'
import './Institutions.styles.scss'
import { Loader } from '../../../components/loader/Loader'
import { getInstitutions } from './services/institutions.service'

import useFetchAndLoad from '../../../hooks/useFetch'

export const Institutions = (): JSX.Element => {
  const { loading, callEndpoint } = useFetchAndLoad()
  const [institutionsList, setinstitutionsList] = useState([])

  const getApiData = async (): Promise<any> => await callEndpoint(getInstitutions())

  useEffect(() => {
    getApiData()
      .then((data) => { setinstitutionsList(data.results) })
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
    <div className='InstitutionsList'>
      {institutionsList.map((institution: any) =>
        <InstitutionCard institutionData={institution} key={institution.id} />
      )}
    </div>
  )
}
