import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
	outline: none;
	border:transparent;
  color: ${props => props.color || 'white'};
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 5px;

  width: ${props => props.width || '100px'};
  border-radius: ${props => (props.radius ? '10px' : '0px')};

	height: 2.25rem;
  font-size: 1.1rem;
  background: ${props => props.background || 'transparent'};
  margin-top: 20px;
  align-items: center;
  justify-content: center;

  onclick: ${props => props.onclick};
  }
`;

type ButtonType = {
  children?: HTMLElement | string;
  radius?: boolean;
  color?: string;
  width?: string;
  onclick?: () => void;
  background?: string;
};

const Button = ({ onclick, children, ...rest }: ButtonType): JSX.Element => {
  return (
    <StyledButton onClick={onclick} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
