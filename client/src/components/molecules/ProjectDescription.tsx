import React from 'react';
import styled from 'styled-components';
import Span from '../atoms/Span';

const ProjectDescription = (props: any) => {
  const title = props.title;
  return (
    <div>
      <Span
        position="absolute"
        paddingLeft="1.5%"
        paddingTop="26px"
        fontSize="14px"
        lineHeight="30px"
        letterSpacing="-0.56pt"
        color="rgb(51,51,51)"
        text="DAY-2"
      ></Span>
      <Span
        position="absolute"
        paddingLeft="1.5%"
        paddingTop="84px"
        fontSize="24px"
        lineHeight="32px"
        letterSpacing="-0.96pt"
        color="rgb(51,51,51)"
        text={title}
      ></Span>
    </div>
  );
};

export default ProjectDescription;
