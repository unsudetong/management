import React, { useState } from 'react';

type StoreProps = {
  children?: JSX.Element;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headerContext = React.createContext<any | null>(null);

const Store = (props: StoreProps): JSX.Element => {
  const [bgColor, setBgColor] = useState('transparent');
  const movePage = (color: string) => setBgColor(color);

  return (
    <>
      <headerContext.Provider value={{ bgColor, movePage }}>
        {props.children}
      </headerContext.Provider>
    </>
  );
};

export default Store;
