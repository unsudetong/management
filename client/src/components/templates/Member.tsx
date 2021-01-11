import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.div`
  width: 70%;
  padding-left: 15%;
  padding-right: 15%;
  position: absolute;
  top: 110px;
`;

const Main = ({ children }: any) => {
  return <StyledMain>hello world</StyledMain>;
};

export default Main;
