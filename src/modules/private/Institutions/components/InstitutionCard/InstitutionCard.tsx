// Services and Models
import { Institution } from '../../models/institution.model'

// Third party libraries
import { useNavigate } from 'react-router-dom'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import Button from '@mui/material/Button'

// Styles
import './InstitutionCard.scss'
interface Props {
  institutionData: Institution
}

export const InstitutionCard = ({ institutionData }: Props): JSX.Element => {

  //Variables declaration
  const navigate = useNavigate()

  // Functions
  const goToInstitutionloginIn = (name: string): void => {
    navigate(`/institution/login/${name}`)
  }

  //Template
  return (
    <div className="institution-card">
      <div className="institution-card__status">
        <h2 className="institution-card__title">{institutionData.display_name}</h2>
        {
          institutionData.icon_logo !== null
            ? <img className='institution-logo' src={institutionData.icon_logo} alt="institution logo" />
            : <AccountBalanceIcon className='institution-logo' />
        }
      </div>

      <div className="institution-card__elements">
        <Button
          className='institution-enter-button'
          variant='contained'
          color='success'
          onClick={() => { goToInstitutionloginIn(institutionData.name) }}>Enter</Button>

      </div>
    </div>
  )
}
