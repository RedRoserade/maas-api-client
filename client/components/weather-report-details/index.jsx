import React, { Component, PropTypes } from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

/**
 * Shows the remaining details about a weather report,
 * such as wind speed, humidity, and so on.
 */
export default class WeatherReportDetails extends Component {

  static propTypes = {
    report: PropTypes.object.isRequired
  }

  render() {
    const { report } = this.props;

    return (
      <Grid className='text-center'>
        <Row>
          <dl>
            <Col sm={4}>
              <dt>Pressure</dt>
              <dd>{report.pressure} <abbr title='Pascal'>Pa</abbr></dd>
            </Col>
            <Col sm={4}>
              <dt>Wind speed and direction</dt>
              <dd>{report.windspeed || '(Unknown)'} {report.winddirection}</dd>
            </Col>
            <Col sm={4}>
              <dt>Humidity</dt>
              <dd>{report.humidity || '(Unknown)'}</dd>
            </Col>
          </dl>
        </Row>
      </Grid>
    );
  }
}
