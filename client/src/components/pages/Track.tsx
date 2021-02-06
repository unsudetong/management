import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import ProjectBanner from '../organisms/ProjectBanner';
import ProjectGroup from '../organisms/ProjectGroup';
import TrackList from '../templates/TrackList';
import ArticleContents from '../templates/ArticleContents';

const StyledTrack = styled.div`
  position: absolute;
  width: 100%;
  top: 60px;
`;

const Track = ({ match }: any): JSX.Element => {
  return (
    <StyledTrack>
      <ProjectBanner />
      <>
        <Route exact path={match.path} component={TrackList}></Route>
        <Route
          exact
          path={`${match.path}/:id`}
          component={ProjectGroup}
        ></Route>
        <Route
          path={`${match.path}/:id/articles/:article_id`}
          component={ArticleContents}
        ></Route>
      </>
    </StyledTrack>
  );
};

export default Track;
