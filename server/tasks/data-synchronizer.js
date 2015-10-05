import { maasApi, tasks } from '../../config';
import got from 'got';
import db from '../db';

const { dataSynchronization } = tasks;

/**
 * Periodic task that synchronizes the latest
 * data record from the MAAS Api, and stores it on the db.
 */
export default function synchronizeData() {
  let report = null;

  got(`${maasApi.baseUrl}/latest`, { json: true })
    .then(response => {
      // Store the report, and check if it already exists. We could do an upsert,
      // but I think it's not part of postgres (yet).
      report = response.body.report;

      return db.one('SELECT COUNT(*) FROM WeatherReports WHERE SOL=$1', report.sol);
    })
    .then(result => {
      if (result.count === '1') {
        console.log(`Report for sol ${report.sol} already exists; nothing to do.`);
        return;
      }

      // Only insert iff no report exists.
      return db.query(`
        INSERT INTO WeatherReports (
          sol, ls, mintemp,
          maxtemp, pressure, humidity,
          windspeed, winddirection, weather,
          season, terrestrialdate, sunrise, sunset
        ) VALUES (
          $(sol), $(ls), $(min_temp),
          $(max_temp), $(pressure), $(abs_humidity),
          $(wind_speed), $(wind_direction), $(atmo_opacity),
          $(season), $(terrestrial_date), $(sunrise), $(sunset)
        )`, report)
        .then(() => {
          console.log(`Successfully ran the data import at ${new Date().toISOString()}.`);
        });
    })
    .catch(err => console.error(`Error:`, err, err.stack))
    .then(() => {
      console.log(`Next run: ${new Date(Date.now() + dataSynchronization.period).toISOString()}`);
      setTimeout(synchronizeData, dataSynchronization.period);
    });
}
