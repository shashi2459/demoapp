import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';
import './styles.scss';

const App = (props) => {

  const providers = ['twitter', 'github', 'aad'];
  const redirect = window.location.pathname;
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-header-text">Static Web App</div>
      </header>

      {/* <div className="App-body">
        <p>
          <a href="/.auth/login/github">Login</a>
        </p>

        <p>
          <a href="/.auth/logout">Log out</a>
        </p>
      </div> */}

      <div className="column is-2">
        <nav className="menu">
          <p className="menu-label">Login via</p>
          <ul className="menu-list">
            {/* <NavLink to="/products" activeClassName="active-link">
              Products
            </NavLink>
            <NavLink to="/about" activeClassName="active-link">
              About
            </NavLink> */}
          </ul>
          {props.children}
        </nav>
        <div className="menu-list auth">
          {providers.map((provider) => (
            <a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}>
              {provider}
            </a>
          ))}
          {userInfo && (
            <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>
              Logout
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
