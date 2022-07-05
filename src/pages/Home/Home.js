import styles from "./Home.module.css";

//required user and get id from user
import { useAuthContext } from "../../Hooks/useAuthContext";
//required TransactionList component
import TransactionList from "../TransactionList/TransactionList";
//required components transactionForm
import TransactionForm from "../Transaction/TransactionForm";
//required Hook useCollection with get realtime data
import { useCollection } from "../../Hooks/useCollection";
const Home = () => {
  //get user from context
  const { user } = useAuthContext();

  // add argument and rules of store collection
  const { documents, error } = useCollection(
    "transactions",
    [
      //user login with user in system match
      "uid",
      "==",
      user.uid,
    ],
    //order follow to content is create and descending
    ["createdAt", "desc"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList list={documents} />}
      </div>
      <div className={styles.sidebar}>
        {/* send props id of user to transaction */}
        <TransactionForm uid={user.uid} />
      </div>

      {/* source code */}
      
    </div>
  );
};

export default Home;
