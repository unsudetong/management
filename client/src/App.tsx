import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/molecules/Header';
import Modal from './components/organisms/Modal';
import LoginButtonGroup from './components/molecules/LoginButtonGroup';
import Main from './components/pages/Main';
import Store from './components/unreuse/Store';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    visible?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onclick?: () => any;
    radius?: boolean;
    width?: string;
    background?: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoginContext = React.createContext<any | null>(null);

export const App = (): JSX.Element => {
  const [loginState, setLoginState] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const clickOutside = ({ target }: any) => {
  //   // console.log(target);
  //   // console.log(document.getElementById('App'));
  //   // console.log(document.getElementById('App')?.contains(target));
  //   if (loginState && !document.getElementById('App')?.contains(target)) {
  //     setLoginState(!loginState);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', clickOutside);
  //   return () => {
  //     document.removeEventListener('click', clickOutside);
  //   };
  // });

  return (
    <div className="App" id="App">
      <Store>
        <Router>
          <LoginContext.Provider
            value={{
              visible: loginState,
              state: loginState,
              onclick: setLoginState,
            }}
          >
            <Modal visible={loginState}>
              <LoginButtonGroup />
            </Modal>
            <Header />
            <Main />
          </LoginContext.Provider>
        </Router>
      </Store>
    </div>
  );
};
