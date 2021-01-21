import React from 'react';
import Button from '../atoms/Button';

const LoginButtonGroup = (): JSX.Element => {
  const loginButtons = ['Local login', 'github', 'google', 'facebook'];
  const loginColor = [
    'black',
    'rgb(70,70,70)',
    'rgb(221,75,57)',
    'rgb(59,89,152)',
  ];
  const onLogin = (auth: string): (() => void) => {
    const login = (name: string) => () => {
      // 클릭된 버튼의 이름에 따라 로그인 API가 달라지게 한다.
      fetch('http://127.0.0.1:4000/auth/' + name).then(res => {
        window.location.href = res.url;
        // console.log(res);
      });
    };
    return login(auth);
  };

  return (
    <>
      {loginButtons.map((strategy, index) => (
        <Button
          width="100%"
          // radius={true}
          background={loginColor[index]}
          key={index}
          onclick={onLogin(loginButtons[index])}
        >
          {`Connect with ${strategy}`}
        </Button>
      ))}
    </>
  );
};

export default LoginButtonGroup;
