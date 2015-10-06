import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import GoBackHandler from '../go-back-handler';

/**
 * Shell for non-home pages.
 */
export default class PageShell extends Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  static getData() {
    return fetch('/api/weather/current').then(res => res.json());
  }

  constructor(props) {
    super(props);
  }

  navigateTo(e, selectedIndex, menuItem) {
    this.setState({ selectedIndex });
    this.context.router.transitionTo(menuItem.route);
  }

  render() {
    const data = this.props.data.pageShell;

    return (
      <section>
        <Navbar>
          <Nav>
            <GoBackHandler
                componentType={NavItem}
                href='#'
                className='nav navbar-nav'>
              Back
            </GoBackHandler>
          </Nav>
          <NavBrand>MAAS Api Client App</NavBrand>

          <Nav right>
            <NavItemLink
                to='startingPage'
                params={{ sol: data.sol }}>
              Latest report: {data.weather}, <abbr title='Average'>~</abbr> {(data.mintemp + data.maxtemp) / 2} <abbr title='Degrees Celsius'>ºC</abbr>
          </NavItemLink>
          </Nav>
        </Navbar>
        <RouteHandler {...this.props} />
      </section>
    );
  }
}
