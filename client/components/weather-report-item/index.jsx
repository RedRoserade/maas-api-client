import React, { Component, PropTypes } from 'react';

export default class WeatherReportItem extends Component {

  static propTypes = {
    report: PropTypes.object.isRequired
  }

  render() {
    const { report } = this.props;

    return (
      <div className='text-center'>
        <h4>{report.weather}, ~ {(report.mintemp + report.maxtemp) / 2} <abbr title='Degrees Celsius'>ºC</abbr></h4>

        <p className='text-muted'>Sol {report.sol}</p>
      </div>
    );
  }
}
