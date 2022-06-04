import styles from "./Home.module.css";

//required components transaction
import Transaction from '../Transaction/Transaction'
const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>List of Money</div>
      <div className={styles.sidebar}>
        <Transaction />
      </div>
    </div>
  );
};

export default Home;
