import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

/**
 * Shows basic information about a weather report.
 */
export default class WeatherReportItem extends Component {

  static propTypes = {
    report: PropTypes.object.isRequired
  }

  render() {
    const { report } = this.props;

    return (
      <div className='text-center'>
        <Link
            to='reportPage'
            params={{ sol: report.sol }}>
          <h4>{report.weather}, <abbr title='Average'>~</abbr> {(report.mintemp + report.maxtemp) / 2} <abbr title='Degrees Celsius'>ºC</abbr></h4>
        </Link>

        <p className='text-muted'>Sol {report.sol}</p>
      </div>
    );
  }
}
