import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';
import './styles.scss';

const App = (props) => {

  const provider = ['aad', 'twitter', 'github'];
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
      console.log('User info', clientPrincipal)
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

      <div className="section columns">
        <div className="column is-2">
          <nav className="menu">
            {/* <p className="menu-label">Login Using</p> */}
            {props.children}
          </nav>
          <div className="menu-list auth">
            {userInfo ? 
              <>
                <p className="menu-label">Login Using</p>

                {provider.map((provider) => (
                  <a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}>
                    {
                      provider === 'aad' ? 'Azure AD'
                        :
                        provider === 'twitter' ? 'Twitter'
                          :
                          provider === 'github' ? 'Github' : ''
                    }
                  </a>
                ))}
              </>
            : <></>
              }
            {!userInfo && (
              <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>
                Logout
              </a>
            )}
          </div>
        </div>
        {!userInfo && (
          <div className="column is-6">
            Hello Guest, please login!
          </div>
        )}
        {userInfo && (
          <div className="column is-6">
            Hello User, Welcome to SWA!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
