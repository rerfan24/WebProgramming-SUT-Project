import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from "react";

function App() {
  let [isDarkMode, setIsDarkMode] = useState(false);
  // document.documentElement.setAttribute('data-theme', 'light');
  
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

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <div className="links">
            <Link to="/">Home Page</Link>
            <Link to="/registration">Registration</Link>
            <Link to="/login">Login</Link>
          </div>
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
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
