import logger from '../config/winston';

const bnLog = (func) => (req, res) => {
  const { method, originalUrl } = req;
  try {
    logger.info(`server - session: started ${method} ${originalUrl}`);
    func(req, res, logger);
  } catch (e) {
    logger.error(`server - session: failed & ${e}`);
    res.send(`Oops, something is wrong with function called! & ${e}`);
  }
};

export default bnLog;
