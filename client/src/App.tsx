import React from 'react';
import Header from './components/molecules/Header';
import Banner from './components/unreuse/Banner';
import Modal from './components/molecules/Modal';

import Button from './components/atoms/Button';
import styled from 'styled-components';

const LoginBox = styled.div``;

const App = () => {
  const loginButtons = ['github', 'google', 'facebook'];
  const loginColor = ['rgb(70,70,70)', 'rgb(221,75,57)', 'rgb(59,89,152)'];

  return (
    <div className="App">
      <Modal visible={true}>
        <LoginBox>
          {loginButtons.map((strategy, index) => (
            <Button
              width="100%"
              radius="true"
              background={loginColor[index]}
              key={index}
            >
              {strategy}
            </Button>
          ))}
        </LoginBox>
      </Modal>
      <Header />
      <Banner />
    </div>
  );
};

export default App;
