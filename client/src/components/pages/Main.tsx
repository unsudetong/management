import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Track from './Track';

const Main = (): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={Home}></Route>
      <Route path="/track" component={Track}></Route>
    </>
  );
};

export default Main;
