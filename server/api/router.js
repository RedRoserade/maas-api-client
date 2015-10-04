import { Router } from 'express';
import weatherReportRouter from './weatherreports';

const apiRouter = new Router();

apiRouter.use('/weather', weatherReportRouter);

export default apiRouter;
