import styles from './TransactionList.module.css'
const TransactionList = ({list}) => {
  return (
    <ul className={styles.transaction}>
	    {list.map((item) => (
		    <li key={item.id}>
			    <p className={styles.name}>{item.name}</p>
			    <p className={styles.money}>${item.money}</p>
		    </li>
	    ))}
    </ul>
  )
}

export default TransactionList