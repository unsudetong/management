import React, { useState } from 'react';
import Header from './components/molecules/Header';
import Banner from './components/unreuse/Banner';
import Modal from './components/organisms/Modal';
import LoginButtonGroup from './components/molecules/LoginButtonGroup';

// import styled from 'styled-components';
// import { Link, Route, Switch } from 'react-router-dom';

type State = any;

const LoginContext = React.createContext<State | null>(null);

const App = () => {
  const [loginState, setLoginState] = useState(false);

  return (
    <div className="App">
      <LoginContext.Provider
        value={{ state: loginState, onclick: setLoginState }}
      >
        <Modal visible={loginState}>
          <LoginButtonGroup />
        </Modal>
        <Header />
        <Banner />
      </LoginContext.Provider>
    </div>
  );
};

const exportModule = { App, LoginContext };

export default exportModule;
