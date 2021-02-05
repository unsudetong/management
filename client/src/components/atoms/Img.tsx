import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img<any>`
  src: ${props => props.src};
  overflow: hidden;
  height: ${props => props.height || '100%'};
  margin-top: ${props => props.marginTop || '10px'};
`;

const Img = ({ ...rest }: any): JSX.Element => {
  return <StyledImg {...rest}></StyledImg>;
};

export default Img;
