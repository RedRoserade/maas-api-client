// Task which will import past reports into the db.

import db from '../db';
import got from 'got';
import { maasApi } from '../../config';

const startDate = new Date(2014, 0, 1);
const endDate = new Date();

got(`${maasApi.baseUrl}/archive?terrestrial_date_start=${startDate.toLocaleDateString()}&terrestrial_date_end=${endDate.toLocaleDateString()}`, { json: true })
  .then(result => {
    const { results } = result.body;
    console.log(results.length);
    return results;
  })
  .then(reports =>
    Promise.all(reports.map(result =>
      db.query(`INSERT INTO WeatherReports (
        sol, ls, mintemp,
        maxtemp, pressure, humidity,
        windspeed, winddirection, weather,
        season, terrestrialdate, sunrise, sunset
      ) VALUES (
        $(sol), $(ls), $(min_temp),
        $(max_temp), $(pressure), $(abs_humidity),
        $(wind_speed), $(wind_direction), $(atmo_opacity),
        $(season), $(terrestrial_date), $(sunrise), $(sunset)
      )`, result)
    ))
  )
  .then(() => {
    console.log(`Successfully imported records between ${startDate} and ${endDate}.`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err, err.stack);
    process.exit(1);
  });
