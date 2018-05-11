import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomeRoute } from '../HomeRoute/HomeRoute';
import { ScratchPadRoute } from '../ScratchPadRoute/ScratchPadRoute';
import ReactiveFormsRoute from '../../containers/ReactiveFormsRoute/ReactiveFormsRoute';

export const AppRouter = () => (
  <Switch>
    <Route path="/pad" component={ScratchPadRoute} />
    <Route path="/form" component={ReactiveFormsRoute} />
    <Route exact={true} path="/" component={HomeRoute} />
  </Switch>
);
