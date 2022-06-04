import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

//required authIsReady check user login and show content to user
//page
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

//Navbar
import Navbar from "./components/Navbar/Navbar";
import { useAuthContext } from "./Hooks/useAuthContext";
// required check user from useAuthContext
function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {/* authenticated is true */}
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route path="/signup">
              {!user && <Signup />}
              {user && <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {!user && <Login />}
              {user && <Redirect to="/" />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
