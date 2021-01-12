import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../templates/Home';
import Member from '../templates/Member';
import Project from '../templates/Project';
import History from '../templates/History';

const Main = (): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={Home}></Route>
      <Route path="/member" component={Member}></Route>
      <Route path="/project" component={Project}></Route>
      <Route path="/history" component={History}></Route>
    </>
  );
};

export default Main;
