import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    <>
      {tracks?.map((track: any, index) => (
        <Link
          to={`${props.match.url}/${track.ID}`}
          key={index}
          style={{ fontSize: '30px' }}
        >
          {track.DEPARTMENT}
        </Link>
      ))}
    </>
  );
};

export default TrackList;
