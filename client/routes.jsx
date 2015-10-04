import React from 'react';
import { Route } from 'react-router';

// Routes for the app.

export default (
  <Route handler={require('./components/shell')}>
    <Route
        path='/'
        handler={require('./pages/starting-page')}
        name='startingPage' />
    <Route
        path='/archive'
        handler={require('./pages/past-reports')}
        name='archive' />
    <Route
        path='report/:sol'
        handler={require('./pages/report-page')}
        name='reportPage' />
  </Route>
);
