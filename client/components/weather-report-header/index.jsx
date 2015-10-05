import React, { Component, PropTypes } from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

export default class WeatherReportHeader extends Component {

  static propTypes = {
    report: PropTypes.object.isRequired
  }

  render() {
    const { report } = this.props;

    return (
      <Grid className='text-center'>
        <h3>
          On {new Date(report.terrestrialdate).toLocaleDateString(navigator.language)}, it'll be {report.weather.toLowerCase()},
        </h3>
        <h4>with a low of {report.mintemp} <abbr title='Degrees Celsius'>ºC</abbr> and a high of {report.maxtemp} <abbr title='Degrees Celsius'>ºC</abbr>.</h4>

        <Row>
          <Col sm={6}>
            <h4>Sunrise</h4>
            {new Date(report.sunrise).toLocaleString(navigator.language)}
          </Col>
          <Col sm={6}>
            <h4>Sunset</h4>
            {new Date(report.sunset).toLocaleString(navigator.language)}
          </Col>
        </Row>

        <div
            className='text-muted text-right'
            style={{ marginTop: 50 }}>
          <small>
            <date dateTime={new Date(report.terrestrialdate).toISOString()}>
              Data for sol {report.sol}, terrestrial date {new Date(report.terrestrialdate).toLocaleDateString(navigator.language)}
            </date>
          </small>
        </div>
      </Grid>
    );
  }
}
