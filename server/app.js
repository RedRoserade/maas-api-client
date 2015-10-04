import express from 'express';
import config from '../config';
import morgan from 'morgan';
import { join } from 'path';
import setupTasks from './tasks/setup';

// Route imports.
import apiRouter from './api/router';

const app = express();

// Setup logging.
app.use(morgan('dev'));

// Setup the routes. I prefer to use routers,
// and mount them where necessary.
app.use('/api', apiRouter);

// Send the index.html file from the app folder.
app.get('*', (req, res) => res.sendFile(join(config.basePath, 'client', 'index.html')));

setupTasks();

const server = app.listen(config.port, () => {
  const { address, port } = server.address();

  console.log(`listening on ${address}:${port}`);
});
