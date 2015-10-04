import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import { AppBar, LeftNav } from 'material-ui';

export default class AppShell extends Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.menuItems = [
      {
        route: 'startingPage',
        text: 'Current weather'
      },
      {
        route: 'archive',
        text: 'Archive'
      }
    ];

    this.state = {
      selectedIndex: 0
    };
  }

  navigateTo(e, selectedIndex, menuItem) {
    this.setState({ selectedIndex });
    this.context.router.transitionTo(menuItem.route);
  }

  render() {
    return (
      <main>
        <AppBar
            onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle()}
            title='MAAS Api Client App' />

        <LeftNav
            ref='leftNav'
            selectedIndex={this.state.selectedIndex}
            docked={false}
            menuItems={this.menuItems}
            onChange={(...args) => this.navigateTo(...args)} />
        <RouteHandler {...this.props} />
      </main>
    );
  }
}
