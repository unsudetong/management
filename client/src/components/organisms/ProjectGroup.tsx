import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Span from '../atoms/Span';
import Project from './Project';

const StyledProjectGroup = styled.div`
  top: 119px;
  padding-top: 62px;
  padding-left: 17.7%;
  padding-right: 17.7%;
`;

const ProjectGroup = (props: any): JSX.Element => {
  const [projects, setProjects] = useState<any>([]);
  // TODO : TRACK_ID를 받을 수 있도록 해야 한다.
  const TRACK_ID = props.match.params.id;

  const getProjectsOfUser = () => {
    const cookie = localStorage.getItem('cookie');
    try {
      fetch(process.env.REACT_APP_SERVER_ADDRESS + `/user_tracks/${TRACK_ID}`, {
        method: 'GET',
        headers: {
          Authorization: cookie || '',
        },
      })
        .then(res => res.json())
        .then(res => setProjects(res.result));
    } catch (error) {
      throw new Error('authCheck error');
    }
  };

  useEffect(() => {
    getProjectsOfUser();
  }, []);

  return (
    <StyledProjectGroup>
      <Span
        fontSize="18pt"
        lineHeight="30px"
        text="PROJECT"
        letterSpacing="-0.72pt"
        marginRight="236px"
      ></Span>
      <Span
        fontSize="18pt"
        lineHeight="30pt"
        text="POST"
        letterSpacing="-0.72pt"
      ></Span>
      {projects?.map((project: any, index: number) => (
        <Project
          key={index}
          projectNum={project.pid}
          title={project.ptitle}
          articles={project.child}
        ></Project>
      ))}
    </StyledProjectGroup>
  );
};

export default ProjectGroup;
