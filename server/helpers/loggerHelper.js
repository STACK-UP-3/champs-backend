import dotenv from 'dotenv';
import logger from '../config/winston';

dotenv.config();

// Logs the results of a function passed as parameter.
const statusLogger = (func) => (req, res) => {
  const { method, originalUrl } = req;
  try {
    if (process.env.NODE_ENV !== 'test') {
      logger.info(`server - session: started ${method} ${originalUrl}`);
    }
    func(req, res, logger);
  } catch (e) {
    logger.error(`server - session: failed & ${e}`);
    res.send(`Oops, something is wrong with function called! & ${e}`);
  }
};

export default statusLogger;
