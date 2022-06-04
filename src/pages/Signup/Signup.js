import styles from "./Signup.module.css";
import useSignup from '../../Hooks/useSignup'
import { useState } from "react";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  //destruck function signup from hook
  const {signup, error, isPending} = useSignup()

  const submitSignup = (e) => {
    e.preventDefault();

    signup(email, password, displayName)
    setEmail('')
    setPassword('')
    setDisplayName('')
    // console.log(email, password);
  };
  return (
    <form onSubmit={submitSignup} className={styles["signup-form"]}>
      <h1>Signup</h1>
      <label htmlFor="email">
        <span>Email: </span>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        <span>Password: </span>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="displayName">
        <span>Name: </span>
        <input
          type="text"
          value={displayName}
          required
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>

      {!isPending && <button className="btn">Signup</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Signup;
