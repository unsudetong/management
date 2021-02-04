import React from 'react';
import styled from 'styled-components';
import ProjectDescription from '../molecules/ProjectDescription';
import ProjectList from '../molecules/ProjectList';

const StyledProject = styled.div<any>`
  width: 100%;
  height: 300px;
  border: 1px solid rgb(246, 246, 246);
  border-radius: 10px;
  box-shadow: 1.2px 2.7px 8px 0px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
`;

const Project = (props: any): JSX.Element => {
  const project_id = props.projectNum;
  const title = props.title;

  return (
    <StyledProject>
      <ProjectDescription title={title}></ProjectDescription>
      <ProjectList projectNum={project_id}></ProjectList>
    </StyledProject>
  );
};

export default Project;
