import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

export default class AppShell extends Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  navigateTo(e, selectedIndex, menuItem) {
    this.setState({ selectedIndex });
    this.context.router.transitionTo(menuItem.route);
  }

  render() {
    return (
      <main>
        <RouteHandler {...this.props} />
      </main>
    );
  }
}
