import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
	outline: none;
	border:transparent;
  color: ${({ color }) => color || 'white'};
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 5px;

  width: ${({ width }: any) => width || '100px'};
  border-radius: ${({ radius }: any) => (radius === 'true' ? '10px' : '0px')};

	height: 2.25rem;
  font-size: 1.1rem;
  background: ${({ background }: any) => background || 'transparent'};
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  }
`;

const Button = ({ children, ...rest }: any) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
