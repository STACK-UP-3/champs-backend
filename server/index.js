import express from 'express';

import db from './sequelize/models';

const { sequelize } = db;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('Database succesfully connected and server listening on port');
  });
});

app.get('**', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Hey !! You are Welcome to BareFoot Nomad',
  });
});

export default app;
