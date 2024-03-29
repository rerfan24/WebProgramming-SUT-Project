import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import GCounter from "./pages/GCounter"
import OCounter from "./pages/OCounter";
import CreateCounter from "./pages/CreateCounter";

function App() {
  let [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    photo: "",
    OCounters: [],
    status: false,
  });
  
  const switchMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'light');
      isDarkMode = false
    }
    else {
        document.documentElement.setAttribute('data-theme', 'dark');
        isDarkMode = true
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            photo: response.data.photo,
            OCounters: response.data.OCounters,
            status: true,
          });
        }
      setLoading(true)
      });
  }, [loading]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    document.location.reload()
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <div className="navbar">
        <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/">Home Page</Link>
                  <Link to="/registration">Registration</Link>
                  <Link to="/login">Login</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home Page</Link>
                </>
              )}
              {authState.status && <Link to="/create"> Create Countdown</Link>}
              {authState.status && <Link to="/" onClick={logout}> Logout</Link>}
            </div>
            <h1> {authState.username} </h1>
          {isDarkMode ? 
            (<> 
              <DarkModeIcon
                onClick={() => {
                  switchMode();
                }}
                className={"dark-mode-icon"}
              />
            </>) :
            (<>
              <LightModeIcon 
                onClick={() => {
                  switchMode();
                }}
                className={"light-mode-icon"}
              />
            </>) }
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/create" exact component={CreateCounter} />
          <Route path="/global/:id" exact component={GCounter} />
          <Route path="/own/:id" exact component={OCounter} />
          <Route path="*" exact component={PageNotFound}/>
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
