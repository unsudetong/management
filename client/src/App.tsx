import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/molecules/Header';
import Modal from './components/organisms/Modal';
import LoginButtonGroup from './components/molecules/LoginButtonGroup';
import Main from './components/pages/Main';
import Store from './components/unreuse/Store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoginContext = React.createContext<any | null>(null);

const App = (): JSX.Element => {
  const [loginState, setLoginState] = useState(false);

  const clickOutside = () => {
    if (loginState) {
      setLoginState(!loginState);
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  });

  return (
    <div className="App">
      <Store>
        <Router>
          <LoginContext.Provider
            value={{ state: loginState, onclick: setLoginState }}
          >
            <Modal visible={loginState}>
              <LoginButtonGroup />
            </Modal>
            <Header />
            <Main />
          </LoginContext.Provider>
        </Router>
      </Store>
    </div>
  );
};

const exportModule = { App, LoginContext };

export default exportModule;
