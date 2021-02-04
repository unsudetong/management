import React from 'react';
import Banner from '../unreuse/Banner';

const Main = (): JSX.Element => {
  return (
    <>
      <Banner />
      <div>
        <img
          style={{
            position: 'absolute',
            paddingLeft: '2.7%',
            paddingRight: '2.7%',
            paddingTop: '1.2%',
          }}
          src="./images/main_about us_img.png"
        ></img>
        <div
          style={{
            position: 'absolute',
            paddingLeft: '44.3%',
            paddingTop: '91px',
          }}
        >
          <h1
            style={{
              color: 'black',
              fontSize: '44px',
            }}
          >
            ABOUT US
          </h1>
        </div>
        <div
          style={{ position: 'relative', left: '15.9%', paddingTop: '182px' }}
        >
          <img
            style={{ width: '22%', borderRadius: '10px', height: '50.5%' }}
            src="./images/about us_1.jpg"
          ></img>
          <img
            style={{
              marginLeft: '20px',
              marginRight: '20px',
              width: '22%',
              borderRadius: '10px',
              height: '50.5%',
            }}
            src="./images/about us_2.jpg"
          ></img>
          <img
            style={{ width: '22%', borderRadius: '10px', height: '50.5%' }}
            src="./images/about us_3.jpg"
          ></img>
        </div>
      </div>
    </>
  );
};

export default Main;
