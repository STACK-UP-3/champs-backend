import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import route from './routes/index';
import db from './sequelize/models';
import logger from './config/winston';
import swaggerDoc from '../swagger.json';
import passportConfig from './config/passport';
import statusLogger from './helpers/loggerHelper';

dotenv.config();

const app = express();
app.use(bodyParser.json());
const { sequelize } = db;
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const basePath = '/api/v1';

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

sequelize.sync().then(() => {
  app.listen(port, () => {
    logger.info(`Database succesfully connected and server listening on ${port}`);
  });
});

app.use(`${basePath}/documentation`, swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(basePath, statusLogger(route));

app.get('**', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'You are Welcome to BareFoot Nomad. Use the link below to navigate to the API Documentation.',
    data: `${process.env.SITE_URL}/api/v1/documentation`
  });
});

export default app;
