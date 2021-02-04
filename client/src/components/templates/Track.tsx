import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProjectBanner from '../organisms/ProjectBanner';
import Project from '../organisms/Project';

const StyledTrack = styled.div`
  position: absolute;
  width: 100%;
  top: 60px;
`;

const ProjectGroup = styled.div`
  top: 119px;
  padding-top: 62px;
  padding-left: 17.7%;
  padding-right: 17.7%;
`;

const Track = (): JSX.Element => {
  const [projects, setProjects] = useState([]);

  const getProjectsOfUser = () => {
    const cookie = localStorage.getItem('cookie');
    try {
      fetch(process.env.REACT_APP_SERVER_ADDRESS + `/user_tracks`, {
        method: 'GET',
        headers: {
          Authorization: cookie || '',
        },
      })
        .then(res => res.json())
        .then(res => {
          res.result?.map((userTrack: any) => {
            fetch(
              process.env.REACT_APP_SERVER_ADDRESS +
                `/projects/${userTrack.TRACK_ID}`,
              {
                method: 'GET',
                headers: {
                  Authorization: cookie || '',
                },
              },
            )
              .then(res => res.json())
              .then(res => {
                setProjects(res.result);
              });
          });
        });
    } catch (error) {
      throw new Error('authCheck error');
    }
  };

  useEffect(() => {
    getProjectsOfUser();
  }, []);

  return (
    <StyledTrack>
      <ProjectBanner />
      <ProjectGroup>
        <span
          style={{
            fontSize: '18pt',
            lineHeight: '30pt',
            letterSpacing: '-0.72pt',
            marginRight: '236px',
          }}
        >
          PROJECT
        </span>
        <span
          style={{
            fontSize: '18pt',
            lineHeight: '30pt',
            letterSpacing: '-0.72pt',
          }}
        >
          POST
        </span>
        {projects?.map((project: any, index) => (
          <Project
            key={index}
            projectNum={project.ID}
            title={project.TITLE}
          ></Project>
        ))}
      </ProjectGroup>
    </StyledTrack>
  );
};

export default Track;
