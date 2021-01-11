import React from 'react';
import styled from 'styled-components';

const ProjectListBackground = styled.div`
  background: #f2f2f2;
  width: 100%;
  padding-top: 5%;
  min-height: 1000px;
`;

const OneOfProject = styled.div`
  display: flex;
  width: 70%;
  height: 100%;
  margin-left: 15%;
  margin-right: 15%;
  min-height: 300px;
  background: white;
`;

const LeftSideOfProject = styled.div`
  width: 25%;
  min-height: 100%;
  border-right: 10px solid #f2f2f2;
`;

const ProjectList = () => {
  return (
    <ProjectListBackground>
      <OneOfProject>
        <LeftSideOfProject>프로젝트 1 이름</LeftSideOfProject>
        <div>프로젝트 게시글</div>
      </OneOfProject>
    </ProjectListBackground>
  );
};

export default ProjectList;
