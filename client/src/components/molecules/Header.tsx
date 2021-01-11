import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Title from '../atoms/Title';
import exportModule from '../../App';

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  height: 110px;
  width: 70%;
  background: ${(props: any) => props.color};
  border-bottom: 2px solid #eeeeee;
  justify-content: space-between;
  padding-left: 15%;
  padding-right: 15%;
  z-index: 10;
`;

const Header = () => {
  const [bgColor, setBgColor] = useState('transparent');
  const { state, onclick } = useContext(exportModule.LoginContext);
  const onclickLoginButton = () => onclick(!state);

  const movePage = () => setBgColor('white');

  return (
    <StyledHeader color={bgColor}>
      <Title value="Lucky ">
        <span style={{ color: 'rgb(16,137,255)' }}>Data</span>
      </Title>
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
        <Link to="/member">
          <Button onclick={movePage} color="#23374D">
            MEMBER
          </Button>
        </Link>
        <Link to="/project">
          <Button onclick={movePage} color="#23374D">
            PROJECT
          </Button>
        </Link>
        <Link to="/history">
          <Button onclick={movePage} color="#23374D">
            HISTORY
          </Button>
        </Link>
        <Button color="#23374D" onclick={onclickLoginButton}>
          LOGIN
        </Button>
      </div>
    </StyledHeader>
  );
};

export default Header;
