import React from 'react';
import styled from 'styled-components';
import ProjectBanner from '../organisms/ProjectBanner';
import ProjectList from '../organisms/ProjectList';

const StyledProject = styled.div`
  position: absolute;
  width: 100%;
  top: 110px;
`;

const Project = (): JSX.Element => {
  return (
    <StyledProject>
      <ProjectBanner />
      <ProjectList />
    </StyledProject>
  );
};

export default Project;
