import styles from "./Login.module.css";
import { useState } from "react";
import useLogin from '../../Hooks/useLogin'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //login with Hook
  const {login, error, isPending} = useLogin()

  const submitLogin = (e) => {
    e.preventDefault()
    login(email, password)
    setEmail('')
    setPassword('')
    console.log(email, password)
  }
  return (
    <form onSubmit={submitLogin} className={styles["login-form"]}>
      <h1>Login</h1>
      <label htmlFor="email">
        <span>Email: </span>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Email'
        />
      </label>
      <label htmlFor="password">
        <span>Password: </span>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter password'
        />
      </label>

      {isPending && <button className="btn" disabled>Login...</button>}
      {!isPending && <button className="btn">Login</button>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Login;
