// Third party libraries
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// Custom components
import { formatter } from '../../../../../utilities/formatter-currencies';

// Styles
import './Transactions.styles.scss'
import { Transaction } from '../../models/Transaction.model';

export const Transactions = ({ transactionsList }: any) => {

  // Template
  return (
    <div className="transactions-list">
      {transactionsList?.map((transaction: Transaction) => {
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