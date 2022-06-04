import style from "./Navbar.module.css";
import useLogout from "../../Hooks/useLogout";
//required Link for Navbar
import { Link } from "react-router-dom";

//check show content for user
import { useAuthContext } from "../../Hooks/useAuthContext";
const Navbar = () => {
  const { logout, error, isPending } = useLogout();
  //get user
  const { user } = useAuthContext();

  return (
    <nav className={style.navbar}>
      <ul>
        <li className={style.title}>Money Today</li>
        {!user && (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>HEY: {user.displayName}</li>
            <li>
              {!isPending && (
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              )}
              {isPending && (
                <button className="btn" disabled>
                  Logout...
                </button>
              )}
            </li>
          </>
        )}
      </ul>
      {error && <p className="error">{error}</p>}
    </nav>
  );
};

export default Navbar;
