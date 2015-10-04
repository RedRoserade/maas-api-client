import React, { Component, PropTypes } from 'react';

export default class ReportPage extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  /**
   * Gets the data necessary for this page.
   */
  static getData(params) {
    return fetch(`/api/weather/${params.sol}`).then(res => res.json());
  }

  render() {
    const data = this.props.data.reportPage;

    return <span>Hi, data is {JSON.stringify(data)}</span>;
  }
}
