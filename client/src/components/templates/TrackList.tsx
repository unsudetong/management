import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TrackList = (props: any): JSX.Element => {
  console.log('here', props);
  return (
    <>
      <span>hello world</span>
      <Link to={`${props.match.url}/${2}`}>here</Link>
    </>
  );
};

export default TrackList;
