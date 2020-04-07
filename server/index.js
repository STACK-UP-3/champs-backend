import express from 'express';
import swaggerUI from 'swagger-ui-express';
import passport from 'passport';
import db from './sequelize/models';
import bnLog from './helpers/log.util';
import logger from './config/winston';
import swaggerDoc from '../swagger.json';
import route from './routes/index';
import passportConfig from './config/passport';

const { sequelize } = db;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(passport.initialize());
passportConfig(passport);
sequelize.sync().then(() => {
  app.listen(port, () => {
    logger.info(`Database succesfully connected and server listening on ${port}`);
  });
});
app.use('/api/v1', route);// base path
app.get('/success', bnLog((req, res) => { res.send('Yay!'); }));
app.get('/error', bnLog(() => { throw new Error('Doh!'); }));
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.get('**', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Hey !! You are Welcome to BareFoot Nomad',
  });
});
export default app;
