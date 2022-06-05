import styles from './TransactionList.module.css'

//require method deleteDocument for remove for page
import { useFirestore } from '../../Hooks/useFirestore'
const TransactionList = ({list}) => {
	const {deleteDocument, response} = useFirestore('transactions')
	console.log(response)
  return (
    <ul className={styles.transaction}>
	    {list.map((item) => (
		    <li key={item.id}>
			    <p className={styles.name}>{item.name}</p>
			    <p className={styles.money}>${item.money}</p>
			    <button onClick={() => deleteDocument(item.id)}>X</button>
		    </li>
	    ))}
    </ul>
  )
}

export default TransactionList