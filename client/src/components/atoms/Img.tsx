import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  src: ${props => props.src};
  overflow: hidden;
  height: 100%;
`;

type imgProps = {
  children?: JSX.Element;
};

const Img = ({ children, ...rest }: imgProps): JSX.Element => {
  return <StyledImg {...rest}>{children}</StyledImg>;
};

export default Img;
