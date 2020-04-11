import express from 'express';
import swaggerUI from 'swagger-ui-express';
import passport from 'passport';
import dotenv from 'dotenv';

import db from './sequelize/models';
import bnLog from './helpers/log.util';
import logger from './config/winston';
import swaggerDoc from '../swagger.json';
import route from './routes/index';
import passportConfig from './config/passport';

dotenv.config();
const { sequelize } = db;


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const port = process.env.PORT || 3000;
const basePath = '/api/v1';

app.use(passport.initialize());
passportConfig(passport);
sequelize.sync().then(() => {
  app.listen(port, () => {
    logger.info(`Database succesfully connected and server listening on ${port}`);
  });
});

app.use(`${basePath}/documentation`, swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(basePath, bnLog(route));

app.get('**', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'You are Welcome to BareFoot Nomad. Use the link below to navigate to the API Documentation.',
    data: '/api/v1/documentation'
  });
});
export default app;
