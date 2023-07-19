import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import './Navbar.scss'
import { AuthContext } from '../../context/AuthContext'

export const Navbar = (): JSX.Element => {

  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const goToInstitutions = (): void => {
    navigate('/institutions')
  }

  return (
    <div className='navbar-container'>
      <AccountBalanceIcon />
      <h2>BelvApp</h2>
      <div className="menu-desktop">
        <Button className='institutions-button' variant='contained' color='success' onClick={() => { goToInstitutions() }}>Institutions</Button>
        <Button className='logout-button' variant='contained' color='error' onClick={() => logout()}>Logout</Button>
      </div>
      <BasicMenu />
    </div>
  )
}

const BasicMenu = (): JSX.Element => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
    logout()
  }

  const goToInstitutions = (): void => {
    navigate('/institutions')
    handleClose()
  }

  return (
    <div className='Menu-mobile'>
      <Button
        variant='contained'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => { goToInstitutions() }}>Institutions</MenuItem>
        <MenuItem className='logout-item' onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
