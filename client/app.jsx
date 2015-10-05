import React from 'react';
import Router, { HistoryLocation } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import 'style!css!bootstrap/dist/css/bootstrap.css';

import routes from './routes';

const appElement = document.getElementById('app');

/**
 * Iterates over the route handlers
 * for a given route, and executes any
 * data-obtaining functions on them, [getData(params)], to be exact.
 *
 * Taken from https://github.com/pheuter/essential-react.git.
 */
function getData(handlers, params) {
  const data = {};

  const dataFetchOperations = handlers
    .filter(route => route.handler.getData)
    .map(route =>
      route.handler
        .getData(params)
        .then(resp => { data[route.name] = resp; })
    );

  return Promise.all(dataFetchOperations).then(() => data);
}

const router = Router.run(
  routes,
  HistoryLocation,
  (Handler, state) =>
    getData(state.routes, state.params)
      .then(data => React.render(<Handler data={data} />, appElement))
);

export { router };
