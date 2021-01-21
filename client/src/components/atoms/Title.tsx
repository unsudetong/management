import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

let cookie = '';

const StyledTitle = styled.span`
  background: transparent;
  font-size: 40px;
  font-weight: 700;
  color: black;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 30px;
  min-width: 250px;
  display: left;
`;

type TitleProps = {
  value: string;
  children: JSX.Element;
};

const authCheck = async () => {
  const myHeader = new Headers();
  myHeader.append('Authorization', localStorage.getItem('cookie') || '');
  try {
    const result = fetch('http://127.0.0.1:4000/auth', {
      method: 'POST',
      credentials: 'same-origin',
      headers: myHeader,
    })
      .then(result => {
        return result.json();
      })
      .then(result => {
        console.log(result.user);
      });
  } catch (error) {
    throw new Error('authCheck error');
  }
};

const login = async () => {
  const result = await fetch(
    'http://127.0.0.1:4000/auth/local?PASSWORD=kakasoo&STUDENT_ID=201634101',
    {
      method: 'POST',
    },
  )
    .then(res => {
      return res.json();
    })
    .then(res => {
      cookie = res.result;
      localStorage.setItem('cookie', res.result);
      // return res.result;
    });
  // console.log('LOGIN : ', result);
};

const Title = ({ children, ...props }: TitleProps): JSX.Element => {
  return (
    <StyledTitle>
      <Link to="/">
        <span color="#23374D">{props.value}</span>
        <span>{children}</span>
      </Link>
      <button onClick={login}> login </button>
      <button onClick={authCheck}> auth check </button>
    </StyledTitle>
  );
};

export default Title;
