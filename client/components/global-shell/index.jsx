import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

/**
 * Contains the application itself.
 */
export default class GlobalShell extends Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <RouteHandler {...this.props} />
      </main>
    );
  }
}
