import React, { Component, PropTypes } from 'react';

export default class StartingPage extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  /**
   * Gets the data necessary for this page.
   */
  static getData() {
    return fetch('/api/weather/current').then(res => res.json());
  }

  render() {
    const { ...data } = this.props.data;

    return <span>Hi, data is {JSON.stringify(data)}</span>;
  }
}
