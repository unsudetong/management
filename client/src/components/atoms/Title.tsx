import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.span`
  background: transparent;
  font-size: 40px;
  font-weight: 700;
  color: black;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 30px;
  min-width: 250px;
  display: left;
`;

type TitleProps = {
  value: string;
};

const Title = (props: TitleProps) => {
  return (
    <StyledTitle>
      <a href="/">{props.value}</a>
    </StyledTitle>
  );
};

export default Title;
