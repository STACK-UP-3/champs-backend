import express from 'express';
import db from './sequelize/models';
import bnLog from './helpers/log.util';
import logger from './config/winston';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';

const { sequelize } = db;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    logger.info(`Database succesfully connected and server listening on ${port}`);
  });
});

app.get('/success', bnLog((req, res) => { res.send('Yay!'); }));
app.get('/error', bnLog(() => { throw new Error('Doh!'); }));
app.get('/test', bnLog(dumFunction));
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get('**', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Hey !! You are Welcome to BareFoot Nomad',
  });
});
const dumFunction = (req, res) => { res.send('Working well!'); };



export default app;
