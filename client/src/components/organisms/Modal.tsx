import React, { useRef, useContext, useEffect } from 'react';
import exportModule from '../../App';
import styled from 'styled-components';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    visible?: string;
  }
}

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
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

const Modal = ({ className, visible, children }: any) => {
  return (
    <ModalOverlay visible={visible}>
      <ModalWrapper className={className} tabIndex={-1} visible={visible}>
        <ModalInner tabIndex={0} className="modalInner">
          <h1 style={{ color: 'black', margin: '0px' }}>Login</h1>
          {children}
        </ModalInner>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Modal;
