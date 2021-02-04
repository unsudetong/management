import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atoms/Button';
// import Title from '../atoms/Title';
import { LoginContext } from '../../App';

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  max-height: 60px;
  width: 70%;
  background: ${props => props.color};
  border-bottom: 2px solid #eeeeee;
  justify-content: space-between;
  padding-left: 17.7%;
  padding-right: 15%;
  z-index: 10;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const checkAuthGetMethod = () => {
  // console.log('clicked!');
  // console.log('user : ', localStorage.getItem('cookie'));
  const myHeader = new Headers();
  myHeader.append('Authorization', localStorage.getItem('cookie') || '');
  try {
    fetch(process.env.REACT_APP_SERVER_ADDRESS + '/users', {
      method: 'GET',
      credentials: 'same-origin',
      headers: myHeader,
    })
      .then(result => result.json())
      .then(result => {
        // console.log('result', result);
      });
  } catch (error) {
    throw new Error('authCheck error');
  }
};

const authCheck = () => {
  const myHeader = new Headers();
  myHeader.append('Authorization', localStorage.getItem('cookie') || '');
  try {
    fetch(process.env.REACT_APP_SERVER_ADDRESS + '/auth', {
      method: 'POST',
      credentials: 'same-origin',
      headers: myHeader,
    })
      .then(result => result.json())
      .then(result => {
        // console.log(result);
        return result.user;
      });
  } catch (error) {
    throw new Error('authCheck error');
  }
};

const Header = (): JSX.Element => {
  const { state, onclick } = useContext(LoginContext);
  const isLogin = localStorage.getItem('cookie') ? true : false;

  const onclickLoginButton = () => {
    // console.log('login button clicked!');
    onclick(!state);
  };

  const onclickLogoutButton = () => {
    // console.log('logout button clicked!');
    localStorage.setItem('cookie', '');
    window.location.reload();
    // isLogin = localStorage.getItem('cookie') ? true : false;
  };

  const buttonText = isLogin ? 'LOGOUT' : 'LOGIN';
  const loginOrOutclick = isLogin ? onclickLogoutButton : onclickLoginButton;

  return (
    <StyledHeader color="white">
      {/* <Title value="Lucky ">
        <span style={{ color: 'rgb(16,137,255)' }}>Data</span>
      </Title> */}
      <img
        style={{ height: '40px', marginTop: '10px' }}
        src="./images/header_logo_black.png"
      ></img>
      <div
        id="HeaderButtonGroup"
        style={{
          display: 'float',
          marginTop: 'auto',
          marginBottom: 'auto',
          width: '420px',
          minWidth: '420px',
        }}
      >
        {/* <Link to="/member"> */}
        {/* <Button color="#23374D">MEMBER</Button> */}
        <button onClick={authCheck}>MEMBER</button>
        {/* </Link> */}
        <Link to="/track">
          <Button color="#23374D">TRACK</Button>
        </Link>
        {/* <Link to="/history">
          <Button color="#23374D">HISTORY</Button>
        </Link> */}
        <button onClick={checkAuthGetMethod}>HISTORY</button>

        <Button color="#23374D" onclick={loginOrOutclick}>
          {buttonText}
        </Button>
      </div>
    </StyledHeader>
  );
};

export default Header;
