import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../templates/Home';
import Member from '../templates/Member';
import Track from '../templates/Track';
import History from '../templates/History';

const Main = (): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={Home}></Route>
      <Route path="/member" component={Member}></Route>
      <Route path="/track" component={Track}></Route>
      <Route path="/history" component={History}></Route>
    </>
  );
};

export default Main;
