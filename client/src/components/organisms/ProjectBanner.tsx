import React from 'react';
import styled from 'styled-components';

const ProjectBackground = styled.div`
  background-image: url(/images/TRACK.png);
  width: 100%;
  min-height: 119px;
  height: 119px;
`;

const ProjectBanner = (): JSX.Element => {
  return <ProjectBackground></ProjectBackground>;
};

export default ProjectBanner;
