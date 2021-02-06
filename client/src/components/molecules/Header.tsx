import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atoms/Button';
import { LoginContext } from '../../App';
import Img from '../atoms/Img';

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

const HeaderButtonGroup = styled.div`
  display: float;
  margintop: auto;
  marginbottom: auto;
  width: 420px;
  minwidth: 420px;
`;

const Header = (): JSX.Element => {
  const { state, onclick } = useContext(LoginContext);
  const isLogin = localStorage.getItem('cookie') ? true : false;

  const onclickLoginButton = () => onclick(!state);

  const onclickLogoutButton = () => {
    localStorage.setItem('cookie', '');
    window.location.reload();
  };

  const buttonText = isLogin ? 'LOGOUT' : 'LOGIN';
  const loginOrOutclick = isLogin ? onclickLogoutButton : onclickLoginButton;

  return (
    <StyledHeader color="white">
      <Img
        height="40px"
        marginTop="10px"
        src="/images/header_logo_black.png"
      ></Img>
      <HeaderButtonGroup>
        <Link to="/tracks">
          <Button color="#23374D">TRACK</Button>
        </Link>
        <Button color="#23374D" onclick={loginOrOutclick}>
          {buttonText}
        </Button>
      </HeaderButtonGroup>
    </StyledHeader>
  );
};

export default Header;
