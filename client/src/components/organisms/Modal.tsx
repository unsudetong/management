import React, { useContext, useState } from 'react';
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

// const authCheck = () => {
//   const myHeader = new Headers();
//   myHeader.append('Authorization', localStorage.getItem('cookie') || '');
//   try {
//     fetch(process.env.REACT_APP_SERVER_ADDRESS + '/auth', {
//       method: 'POST',
//       credentials: 'same-origin',
//       headers: myHeader,
//     })
//       .then(result => result.json())
//       .then(result => result.user);
//   } catch (error) {
//     throw new Error('authCheck error');
//   }
// };

const Modal = ({ className, visible, children }: modalProps): JSX.Element => {
  const { state, onclick } = useContext(LoginContext);
  const [id, setID] = useState(null);
  const [password, setPassword] = useState(null);

  const changeID = (event: any) => setID(event.target.value);
  const changePassword = (event: any) => setPassword(event.target.value);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clickOutside = ({ target }: any) => {
    if (state && document.getElementById('modalBackground') === target) {
      onclick();
    }
  };

  const login = () => {
    const params = `STUDENT_ID=${id}&PASSWORD=${password}`;
    const url = process.env.REACT_APP_SERVER_ADDRESS + '/auth/local?' + params;
    try {
      fetch(url, {
        body: JSON.stringify({
          STUDNET_ID: id,
          PASSWORD: password,
        }),
        method: 'POST',
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.message === 'success') {
            localStorage.setItem('cookie', res.result);
            onclick();
          } else {
            return;
          }
        });
    } catch (error) {
      console.log('로그인에 실패하였습니다.');
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
            placeholder="가천대학교 학번을 입력해주세요."
            style={{ width: '100%', height: '30px', marginBottom: '5px' }}
            id="student_id"
            name="student_id"
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

          {children}
        </ModalInner>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Modal;
