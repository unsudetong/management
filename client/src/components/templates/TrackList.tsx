import { Console } from 'console';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Span from '../atoms/Span';

const StyledTrackList = styled.div`
  margin-left: 17.2%;
  margin-right: 17.2%;
  margin-top: 3.2%;
  border: 1px solid red;
`;

const StyledOneTrack = styled.div`
  border: 1px solid green;
`;

const TrackList = (props: any): JSX.Element => {
  const [tracks, setTracks] = useState([]);

  const getTracks = () => {
    const cookie = localStorage.getItem('cookie');
    try {
      fetch(process.env.REACT_APP_SERVER_ADDRESS + `/tracks`, {
        method: 'GET',
        headers: {
          Authorization: cookie || '',
        },
      })
        .then(res => res.json())
        .then(res => setTracks(res.result));
    } catch (error) {
      throw new Error('authCheck error');
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <StyledTrackList>
      {tracks?.map((track: any, index) => (
        <StyledOneTrack>
          <Link
            to={`${props.match.url}/${track.ID}`}
            style={{ fontSize: '30px' }}
          >
            <Button key={index} width="100%">
              <Span text={track.DEPARTMENT} width="100%"></Span>
            </Button>
          </Link>
        </StyledOneTrack>
      ))}
    </StyledTrackList>
  );
};

export default TrackList;
