import React, { Component, PropTypes } from 'react';
import qs from 'qs';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

/**
 * Fetches weather reports between 2 dates.
 */
function getWeatherReports({ startDate = new Date(), endDate = new Date() } = {}) {
  return fetch(`/api/weather?${qs.stringify({ startDate, endDate })}`)
    .then(res => res.json());
}

export default class PastReportsPage extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  /**
   * Gets the data necessary for this page.
   * This will get data from the last 7 days.
   */
  static getData() {
    return getWeatherReports({
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date()
    });
  }

  render() {
    const data = this.props.data.archive.reports;

    const reportHtml = data.map(r =>
      <ListGroupItem key={r.sol}>
        {JSON.stringify(r)}
      </ListGroupItem>
    );

    return <ListGroup>{reportHtml}</ListGroup>;
  }
}
