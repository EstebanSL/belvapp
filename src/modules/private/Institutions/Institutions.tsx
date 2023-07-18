import { type ChangeEvent, useEffect, useState } from 'react'

// Services
import { getInstitutions } from './services/institutions.service'

// Custom components
import { InstitutionCard } from './components/InstitutionCard/InstitutionCard'
import { Loader } from '../../../components/loader/Loader'
import useFetchAndLoad from '../../../hooks/useFetch'

// styles
import './Institutions.styles.scss'
import { Institution } from './models/institution.model'
import { ServerResponse } from '../../../models/serverResponse.model'

export const Institutions = (): JSX.Element => {

  // Variable declarations
  const { loading, callEndpoint } = useFetchAndLoad()
  const [institutionsList, setinstitutionsList] = useState<Institution[]>([])
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([])

  // Functions
  const getApiData = async (): Promise<ServerResponse<Institution>> => await callEndpoint(getInstitutions())

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const lowerCase = e.target.value.toLowerCase()
    const filteredData = institutionsList.filter((el: Institution) => {
      if (lowerCase === '') {
        return el
      } else {
        return el.display_name.toLowerCase().includes(lowerCase)
      }
    })
    setFilteredInstitutions(filteredData)
  }

  useEffect(() => {
    getApiData()
      .then((data: ServerResponse<Institution>) => { setinstitutionsList(data.results); setFilteredInstitutions(data.results) })
      .catch((error) => { console.log(error) })
  }, [])

  // Template
  if (loading) {
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
        {filteredInstitutions.map((institution: Institution) =>
          <InstitutionCard institutionData={institution} key={institution.id} />
        )}
      </div>
    </div>
  )
}
