import { Router } from 'express';
import db from '../../db';

const weatherReportRouter = new Router();

// Get all the weather reports.
weatherReportRouter.get('/', (req, res) => {
  const {
    startDate = new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate = new Date()
  } = req.query;

  db.query('select * from WeatherReports where terrestrialDate between $1 and $2 order by sol desc', [
    new Date(startDate),
    new Date(endDate)
  ])
  .then(result => res.json({ reports: result }))
  .catch(err => {
    console.error(err, err.stack);
    res.sendStatus(500);
  });
});

// Get the current weather report.
weatherReportRouter.get('/current', (req, res) => {
  db.one('select * from WeatherReports order by sol desc limit 1;')
    .then(result => res.json(result))
    .catch(err => {
      console.error(err, err.stack);
      res.sendStatus(500);
    });
});

weatherReportRouter.get('/:sol', (req, res, next) => {
  const sol = parseInt(req.params.sol);

  if (isNaN(sol)) { return next(); }

  db.oneOrNone('select * from WeatherReports where sol=$1', sol)
    .then(result => {
      if (result === null) { return res.sendStatus(404); }

      res.json(result);
    })
    .catch(err => {
      console.error(err, err.stack);
      res.sendStatus(500);
    });
});

export default weatherReportRouter;
