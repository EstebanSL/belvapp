import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './Transactions.styles.scss'
import { formatter } from '../../../../../utilities/formatter-currencies';

export const Transactions = ({ transactionsList }: any) => {

  return (
    <div className="transactions-list">
      {transactionsList?.map((transaction: any) => {
        return (
          <div className='transaction' key={transaction.id}>
            <div className="info">
              <p>
                {
                  transaction.type === 'INFLOW' ? <AddCircleIcon color='success' /> : <RemoveCircleIcon color='error' />
                }
                {transaction.description}</p>
            </div>
            <div className="info">
              <span>{transaction.category || 'Other'}</span>
              <h4>{formatter.format(transaction.amount)}</h4>
            </div>
          </div>
        )
      })}
    </div>
  )
}