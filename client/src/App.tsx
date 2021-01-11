import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/molecules/Header';
import Banner from './components/unreuse/Banner';
import Modal from './components/organisms/Modal';
import LoginButtonGroup from './components/molecules/LoginButtonGroup';
import Main from './components/pages/Main';

// import styled from 'styled-components';
// import { Link, Route, Switch } from 'react-router-dom';

type State = any;

const LoginContext = React.createContext<State | null>(null);

const App = () => {
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
    </div>
  );
};

const exportModule = { App, LoginContext };

export default exportModule;
