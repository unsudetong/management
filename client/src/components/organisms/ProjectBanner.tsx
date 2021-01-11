import React from 'react';
import styled from 'styled-components';

const ProjectBackground = styled.div`
  background: #3e3e3e;
  width: 100%;
  height: 300px;
`;

const ProjectBackgroundTitle = styled.span`
  position: absolute;
  width: 70%;
  font-size: 80px;
  color: white;
  padding-left: 15%;
`;

const ProjectBackgroundText = styled.span`
  position: absolute;
  width: 70%;
  font-size: 20px;
  color: white;
  padding-left: 15%;
`;

const ProjectBanner = () => {
  return (
    <ProjectBackground>
      <ProjectBackgroundTitle>PROJECT</ProjectBackgroundTitle>
      <ProjectBackgroundText>운수데통 LevelUp</ProjectBackgroundText>
    </ProjectBackground>
  );
};

export default ProjectBanner;
