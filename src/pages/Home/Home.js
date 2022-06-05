import styles from "./Home.module.css";

//required user and get id from user
import {useAuthContext} from '../../Hooks/useAuthContext'

//required components transaction
import Transaction from '../Transaction/Transaction'

const Home = () => {

  const {user} = useAuthContext()
  return (
    <div className={styles.container}>
      <div className={styles.content}>List of Money</div>
      <div className={styles.sidebar}>
        {/* send props id of user to transaction */}
        <Transaction uid={user.uid}/>
      </div>
    </div>
  );
};

export default Home;
