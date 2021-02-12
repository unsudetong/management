import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import dotenv from 'dotenv';
import { LoginContext } from '../../App';
dotenv.config();

const ModalWrapper = styled.div`
  id: ${props => props.id};
  box-sizing: border-box;
  display: ${visible => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  onclick: ${props => props.onclick};
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  color: ${({ color }) => color || 'white'};
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

type modalProps = {
  className?: string;
  visible?: boolean;
  children?: JSX.Element;
};

const Modal = ({ className, visible, children }: modalProps): JSX.Element => {
  const { state, onclick } = useContext(LoginContext);
  const [id, setID] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState('정보를 입력 후 로그인을 눌려주세요.');
  const [messageColor, setMEssageColor] = useState('red');

  useEffect(() => {
    if (localStorage.getItem('cookie')) {
      setMessage('이미 로그인에 성공한 유저입니다.');
      setMEssageColor('blue');
    }
  }, [state]);

  const changeID = (event: any) => setID(event.target.value);
  const changePassword = (event: any) => setPassword(event.target.value);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clickOutside = ({ target }: any) => {
    if (state && document.getElementById('modalBackground') === target) {
      onclick();
    }
  };

  const login = () => {
    const url = process.env.REACT_APP_SERVER_ADDRESS + '/auth/local';
    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          USER_ID: id,
          PASSWORD: password,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === 'success') {
            localStorage.setItem('cookie', res.result);

            setMessage('이미 로그인에 성공한 유저입니다.');
            setMEssageColor('blue');
            onclick();
            window.location.href = String(
              process.env.REACT_APP_CLIENT_ROOT_ADDRESS,
            );
          } else {
            setMessage('아이디와 비밀번호를 다시 확인해주세요.');
            setMEssageColor('red');
            return;
          }
        });
    } catch (error) {
      setMessage('알 수 없는 이유로 로그인에 실패하였습니다.');
      setMEssageColor('red');
    }
  };

  const isEnter = (event: any) => event.charCode === 13 && login();
  return (
    <ModalOverlay visible={visible}>
      <ModalWrapper
        id={'modalBackground'}
        className={className}
        tabIndex={-1}
        visible={visible}
        onClick={clickOutside}
      >
        <ModalInner tabIndex={0} className="modalInner">
          <h1 style={{ color: 'black', margin: '0px', marginBottom: '5px' }}>
            Login
          </h1>
          <input
            placeholder="아이디를 입력해주세요."
            style={{ width: '100%', height: '30px', marginBottom: '5px' }}
            id="user_id"
            name="user_id"
            // value="201634101"
            onChange={changeID}
          ></input>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            style={{ width: '100%', height: '30px', marginBottom: '5px' }}
            id="password"
            name="password"
            // value="kakasoo"
            onChange={changePassword}
            onKeyPress={isEnter}
          ></input>
          <button
            style={{ width: '100%', height: '30px', marginBottom: '5px' }}
            id="login_button"
            onClick={login}
          >
            login
          </button>
          {/* <button onClick={authCheck}> auth check </button> */}
          <span
            style={{
              color: messageColor,
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {message}
          </span>
          {children}
        </ModalInner>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Modal;
