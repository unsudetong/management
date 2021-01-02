import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  src: ${props => props.src};
  overflow: hidden;
`;

const Banner = () => {
  return (
    <div className="Banner" style={{ height: '1000px' }}>
      <Img src="images/macAndCoffee.jpg" alt=""></Img>
    </div>
  );
};

export default Banner;
