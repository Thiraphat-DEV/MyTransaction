import { useState } from "react";
//required function addToDocument
import {useFirestore} from '../../Hooks/useFirestore'
//component children of HomePage
const Transaction = () => {
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  //get function addDocument
  const {addDocument}  =  useFirestore('transactions')

  const submitTransaction = (e) => {
	//protect refresh
	e.preventDefault()
    //use function add to Doc

  // ** add unique id from authcontext with props

	addDocument({name, money})
	setName('')
	setMoney('')

  }
  return (
    <form onSubmit={submitTransaction}>
      <label htmlFor="name">
        <span>Transaction Name: </span>
        <input value={name} type="text" required onChange={(e) => setName(e.target.value)} />
      </label>
      <label htmlFor="money">
        <span>Money: </span>
        <input value={money} type="number" required onChange={(e) => setMoney(e.target.value)} />
      </label>
      <button>Add</button>
    </form>

  );
};

export default Transaction;
