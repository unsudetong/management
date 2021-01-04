import React from 'react';
import Button from '../atoms/Button';
import styled from 'styled-components';
// import { Link, Route, Switch } from 'react-router-dom';

const LoginButtonGroup = () => {
  const loginButtons = ['github', 'google', 'facebook'];
  const loginColor = ['rgb(70,70,70)', 'rgb(221,75,57)', 'rgb(59,89,152)'];
  const onLogin = (auth: string): Function => {
    const login = (name: string) => () => {
      fetch('http://127.0.0.1:4000/auth/github').then(res => {
        window.location.href = res.url;
        console.log(res);
      });
    };
    return login(auth);
  };

  return (
    <>
      {loginButtons.map((strategy, index) => (
        <Button
          width="100%"
          radius="true"
          background={loginColor[index]}
          key={index}
          onclick={onLogin(loginButtons[index])}
        >
          Connect with {strategy}
        </Button>
      ))}
    </>
  );
};

export default LoginButtonGroup;
