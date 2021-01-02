import React from 'react';
import styled from 'styled-components';

const StyledBanner = styled.div`
  height: 100vh;
  background-image: url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fnp5AW%2FbtqR3S496I1%2FNNu1tBWDo1yYN3ax8raaz1%2Fimg.jpg);
  background-size: cover;
  background-attachment: fixed;
`;

const Banner = () => {
  return <StyledBanner />;
};

export default Banner;
