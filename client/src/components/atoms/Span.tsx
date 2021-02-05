import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span<any>`
  position: ${props => props.positon || 'static'};
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  padding-top: ${props => props.paddingTop};
  padding-bottom: ${props => props.paddingBottom};
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  letter-spacing: ${props => props.letterSpacing};
  margin-right: ${props => props.marginRight};
  color: ${props => props.color || 'black'};
`;

const Span = ({ text, ...rest }: any): JSX.Element => {
  return <StyledSpan {...rest}>{text}</StyledSpan>;
};

export default Span;
