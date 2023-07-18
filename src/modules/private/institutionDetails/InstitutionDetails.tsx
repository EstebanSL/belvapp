import { useContext, useEffect, useState } from 'react'

// Third party libraries
import { useParams, Outlet, useNavigate } from 'react-router-dom'
import { Box, Tab, Tabs } from '@mui/material'

// Custom components
import { AccountsList } from './components/AccountList/AccountList'
import { TransactionsList } from './components/TransactionsList/TransactionsList'
import { LinkContext } from '../../../context/linkContext'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const InstitutionDetails = (): JSX.Element => {
  const [tab, setTab] = useState(0)
  const { id } = useParams()
  const { accountId } = useParams()
  const navigate = useNavigate()

  const { link, removeLink } = useContext(LinkContext)

  function a11yProps (index: number): Record<string, string> {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  useEffect(() => {
    console.log(link);

    if (!link || link.institution !== id) {
      navigate(`/institution/login/${id}`)
      removeLink()
    }

  }, [])

  useEffect(() => {
    return () => {
      removeLink()
    }
  }, [])

  const handleTabChange = (_: any, newValue: number): void => {
    setTab(newValue)
  }

  if (accountId != null) {
    return <Outlet />
  }

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Accounts" {...a11yProps(0)} />
          <Tab label="Transactions" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tab} index={0}>
        <AccountsList />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <TransactionsList />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={2}>
        Item Three
      </CustomTabPanel>
    </div >
  )
}

function CustomTabPanel (props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  )
}
