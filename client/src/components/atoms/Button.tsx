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

	height: 2.25rem;
  font-size: 1.1rem;

  background: transparent;
  }
`;

const Button = ({ children, ...rest }: any) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
