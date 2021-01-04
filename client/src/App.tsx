import React from 'react';
import Header from './components/molecules/Header';
import Banner from './components/unreuse/Banner';
import Modal from './components/organisms/Modal';
import LoginButtonGroup from './components/molecules/LoginButtonGroup';

import styled from 'styled-components';
import { Link, Route, Switch } from 'react-router-dom';

// const LoginBox = styled.div``;

const App = () => {
  return (
    <div className="App">
      <Modal visible={true}>
        <LoginButtonGroup />
      </Modal>
      <Header />
      <Banner />
    </div>
  );
};

export default App;
