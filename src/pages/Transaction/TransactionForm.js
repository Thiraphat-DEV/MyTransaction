import { useState, useEffect } from "react";
//required function addToDocument
import { useFirestore } from "../../Hooks/useFirestore";
//component children of HomePage
const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  //get function addDocument
  const { addDocument, response } = useFirestore("transactions");

  const submitTransaction = (e) => {
    //protect refresh form
    e.preventDefault();
    // use function add to Doc
    // add unique id of user from authcontext with props
    addDocument({ uid, name, money });
    //check send to transaction document is  success
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setMoney("");
    }
    //rerender everytime of send to document success
  }, [response.success]);
  return (
    <form onSubmit={submitTransaction}>
      <label htmlFor="name">
        <span>Menu Name: </span>
        <input
          value={name}
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter MenuName: "
        />
      </label>
      <label htmlFor="money">
        <span>Money($): </span>
        <input
        aria-label="cost"
          value={money}
          type="number"
          required
          onChange={(e) => setMoney(e.target.value)}
          placeholder="Enter Money: "
        />
      </label>
      <button className="addmenu">Add</button>
    </form>
  );
};

export default TransactionForm;
