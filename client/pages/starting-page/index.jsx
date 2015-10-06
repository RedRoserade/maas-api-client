import React, { Component, PropTypes } from 'react';
import qs from 'qs';

import { Grid, Col, Row, Jumbotron, Thumbnail } from 'react-bootstrap';

import { Link } from 'react-router';

import WeatherReportItem from '../../components/weather-report-item';
import WeatherReportHeader from '../../components/weather-report-header';
import WeatherReportDetails from '../../components/weather-report-details';

export default class StartingPage extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  /**
   * Gets the data necessary for this page.
   * In this case, we retrieve the data for the
   * current report and for the past 7 days.
   */
  static getData() {
    const dateSpec = {
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date()
    };

    return Promise.all([
      fetch('/api/weather/current').then(res => res.json()),
      fetch(`/api/weather?${qs.stringify(dateSpec)}`).then(res => res.json())
    ])
    .then(result => ({
      current: result[0],
      past: result[1].reports//.filter(r => r.sol !== result[0].sol)
    }));
  }

  render() {
    const { current, past } = this.props.data.startingPage;

    const pastReportsHtml = past.map(pastReport =>
      <Col
          sm={4}
          key={pastReport.sol}>
        <Thumbnail>
          <WeatherReportItem report={pastReport} />
        </Thumbnail>
      </Col>
    );

    return (
      <article>
        <Jumbotron>
          <WeatherReportHeader report={current} />
        </Jumbotron>

        <WeatherReportDetails report={current} />

        <section>
          <Grid>
            <h3>Past reports <small><Link to='archive'>(See past reports)</Link></small></h3>
            <Row>
              {pastReportsHtml}
            </Row>
          </Grid>
        </section>
      </article>
    );
  }
}
