import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  src: ${props => props.src};
  overflow: hidden;
  height: 100%;
`;

const Img = ({ children, ...rest }: any) => {
  return <StyledImg {...rest}>{children}</StyledImg>;
};

export default Img;
