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
  margin-left: 15%;
  margin-right: 15%;
  background: white;
`;

const LeftSideOfProject = styled.div`
  width: 25%;
  min-height: 100%;
  border-right: 10px solid #f2f2f2;
`;

const RightSideOfProject = () => {
  const examples = [
    '[미션] 2^3 큐브 알고리즘',
    '[미션] 3^3 큐브 알고리즘',
    '배경지식',
    '객체지향 프로그래밍',
  ];

  return (
    <div style={{ width: '100%' }}>
      {examples.map((title, index) => (
        <div
          style={{
            margin: '40px',
            marginTop: '20px',
            marginBottom: '20px',
            fontSize: '20px',
            background: '#f2f2f2',
            width: 'calc(100% - 90px)',
            padding: '5px',
          }}
          key={index}
        >
          {index} {title}
        </div>
      ))}
    </div>
  );
};

const ProjectList = (): JSX.Element => {
  return (
    <ProjectListBackground>
      <OneOfProject>
        <LeftSideOfProject>
          <p style={{ fontSize: '30px' }}>Day-1</p>
          <span style={{ fontSize: '25px' }}>객체지향 프로그래밍</span>
        </LeftSideOfProject>
        <RightSideOfProject />
      </OneOfProject>
    </ProjectListBackground>
  );
};

export default ProjectList;
