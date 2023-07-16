// import { useNavigate } from 'react-router-dom'
import './InstitutionCard.scss'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
interface Props {
  institutionData: any
}

export const InstitutionCard = ({ institutionData }: Props): JSX.Element => {
  const navigate = useNavigate()

  const goToInstitutionloginIn = (name: string): void => {
    navigate(`/institution/login/${name}`)
  }
  return (
    <div className="institution-card">
      <div className="institution-card__status">
        <h2 className="institution-card__title">{institutionData.display_name}</h2>
      </div>

      <div className="institution-card__elements">
        {
          institutionData.icon_logo !== null
            ? <img className='institution-logo' src={institutionData.icon_logo} alt="institution logo" />
            : <AccountBalanceIcon className='institution-logo' />
        }
        <Button
          className='institution-enter-button'
          variant='contained'
          color='success'
          onClick={() => { goToInstitutionloginIn(institutionData.name) }}>Enter</Button>

      </div>
    </div>
  )
}
