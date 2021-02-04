import React from 'react';
import styled from 'styled-components';

// background-image: url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fnp5AW%2FbtqR3S496I1%2FNNu1tBWDo1yYN3ax8raaz1%2Fimg.jpg);

const StyledBanner = styled.div`
  height: 895px;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('./images/main_img.jpg');
`;

const Banner = (): JSX.Element => {
  return (
    <>
      <div style={{ height: '60px' }}></div>
      {/* <StyledBanner /> */}
      <img src="./images/main_img.jpg"></img>
      <img
        style={{
          position: 'absolute',
          top: 'calc(17.5% + 60px)',
          left: '17.7%',
        }}
        src="./images/main_luckydata.png"
      ></img>
      <div
        style={{
          position: 'absolute',
          left: '18.8%',
          top: 'calc(35.1% + 60px)',
          color: 'white',
        }}
      >
        <p style={{ margin: '0px' }}>운수대통에서 비롯된 말로</p>
        <p style={{ margin: '0px' }}>대자를 데이터의 데자로 바꾼 말이다</p>
        <p style={{ margin: '0px' }}>
          운수가 좋은 날에는 데이터 분석이 잘 될 거라는 의미이다.
        </p>
      </div>
    </>
  );
};

export default Banner;
