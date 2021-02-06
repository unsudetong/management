import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import ProjectBanner from '../organisms/ProjectBanner';
import ProjectGroup from '../organisms/ProjectGroup';
import TrackList from '../templates/TrackList';

const StyledTrack = styled.div`
  position: absolute;
  width: 100%;
  top: 60px;
`;

const Track = ({ match }: any): JSX.Element => {
  console.log(match);
  const data = 2;
  return (
    <StyledTrack>
      <ProjectBanner />
      <>
        <Route exact path={match.path} component={TrackList}></Route>
        <Route path={`${match.path}/:id`} component={ProjectGroup}></Route>
      </>
    </StyledTrack>
  );
};

export default Track;
